import {Router} from 'express';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';

const router= Router()
const prisma= new PrismaClient();

//User CRUD
/*
Test with curl
curl -X POST -H "Content-Type: application/json" \ -d "{\"name\": \"Elon Musk\", \"email\": \"doge@twitter.com\", \"username\": \"elon\"}" \ http://localhost:3000/user/
*/

//Create User
router.post('/', async (req, res) => {
    const {email, name, username}= req.body;
    console.log(email, name, username);
    try {
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello, I'm new on WeChange"
            },
        });


    res.json(result);
    }catch (e) {
        res.status(400). json({error: "username and email should be unique"});
    }
});

//List User
router.get('/', async (req, res) => {
    const allUser= await prisma.user.findMany();
    res.json(allUser);
});

//Get One User
router.get('/:id', async (req, res) => {
    const{id}= req.params;
    const user = await prisma.user.findUnique({where: {id: Number(id)}});
    res.json(user);
});
/*
curl -X PUT -H "Content-Type: application/json" \ -d '{"name": "Robert", "bio": "Hello there!"}' \ http://localhost:3000/user/1
*/
//Update User
router.put('/:id', async (req, res) => {
    const{id}= req.params;
    const {bio, name, image} = req.body;
    try{
        const result = await prisma.user.update({
            where: {id: Number(id)},
            data: {bio,name,image},
        });
        res.json(result);
    }catch (e){
        res.status(400). json({error: "Failed to update the user"});

    }
});

/*
curl -X DELETE http://localhost:3000/user/2
*/
//Delete User
router.delete('/:id', async (req, res) => {
    const{id}= req.params;
    await prisma.user.delete({where: {id: Number(id)}});
    res.sendStatus(200);
});

export default router;