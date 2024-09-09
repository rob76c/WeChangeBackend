import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { sendEmailToken } from "../services/emailService";

const EMAIL_TOKEN_EXPIRATION_MINUTES= 10;
const AUTHENTICATION_EXPIRATION_HOURS= 12;

const router= Router();
const prisma = new PrismaClient();
const JWT_SECRET= "SUPER SECRET"; //

//Generate a random 8 digit token number as email token
function generateEmailToken(): string{
    return Math.floor(10000000+ Math.random() * 90000000).toString();
}
function generateAuthToken(tokenId: number) : string {
    const jwtPayload = {tokenId};
    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm:"HS256",
        noTimestamp: true,
    });
}
//Create a user if it does not exist.
//generate emailToken and send to their email
router.post('/login', async (req, res) => {
    const {email} = req.body;

    //generate Token
    const emailToken= generateEmailToken();
    const expiration= new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES* 60 * 1000);

try {
    const createdToken = await prisma.token.create({
        data: {
            type: "EMAIL",
            emailToken,
            expiration,
            user: {
                connectOrCreate: {
                    where: {email},
                    create: {email},
                },
            },
        },
    });
    console.log(createdToken);
    //send emailToken to users email
    await sendEmailToken(email, emailToken);
    res.sendStatus(200);
} catch(e){
    console.log(e);
    res
    .status(400)
    .json({error: "Couldn't start the authentication process"});
}

});

//Validate emailToken
//Generate a long lived JWT token
router.post('/authenticate',async(req, res) => {
    const {email,emailToken}= req.body;

    const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken,
        },
        include: {
            user: true,
        },
    });

    console.log(email,emailToken);
    if (!dbEmailToken || !dbEmailToken.valid) {
        return res.sendStatus(401);
    }
    if (dbEmailToken.expiration< new Date()) {
        return res.status(401).json({error: 'Token expired!'});
    }
    if (dbEmailToken?.user?.email !== email ) {
        return res.status(401).json({error: 'Not your token!'});

    }

    // Validated the user is owner of the coresponding email

    const expiration= new Date(new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS*60 * 60 * 1000);

    //Generate API token
    const apiToken = await prisma.token.create({
        data: {
            type: 'API',
            expiration,
            user: {
                connect: {
                    email,
                },
            },
        },
    });

    //Invalidate email token
    await prisma.token.update({
        where: {id:dbEmailToken.id },
        data: {valid: false},
    });

    //generate the JWT token
    const authToken= generateAuthToken(apiToken.id);

    res.json({authToken});
});
export default router;