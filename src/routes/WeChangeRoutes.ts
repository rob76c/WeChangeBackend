import {Router} from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';



const router= Router()
const prisma= new PrismaClient();


//Post CRUD

//Create Post
router.post('/', async (req, res) => {
    const {content, image }= req.body;
    //@ts-ignore
    const user = req.user;
    try {
        const result = await prisma.post.create({
            data: {
                content,
                image,
                userId: user.id // TODO manage based on auth user
            },
            include: {user:true},
        });


    res.json(result);
    }catch (e) {
        res.status(400). json({error: "Post failed"});
    }
})

//List all Posts
router.get('/', async (req, res) => {
    const allPosts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    id: true, 
                    name: true, 
                    username: true, 
                    image: true, 
                },
            },
        },
});
    res.json(allPosts);
});

//Get One Post
router.get('/:id', async (req, res) => {
    const{id}= req.params;
    console.log("Query tweet with id:", id);
    const post = await prisma.post.findUnique({
        where: {id: Number(id)}, 
        include:{user:true},

});
    if(!post) {
        return res.status(404).json({error: "Post not found!"})
    }
    res.json(post)
});

//Update Post-- no need to update there is no need to change a post only truth!
// router.put('/:id', async(req, res) => {
//     const{id}= req.params;
//     const {content}= req.body;
//     try {
//         const result= await prisma.post.update({
//             where: {id: Number(id)},
//             data: {content},
//         });
//         res.json(result);
//     } catch (e){
//         res.status(400). json({error: "Failed to update the post"});
//     }
// })

//Delete Post
router.delete('/:id', async (req, res) => {
    const{id}= req.params;
    await prisma.post.delete({where: {id: Number (id)}});
    res.sendStatus(200);
})

export default router;