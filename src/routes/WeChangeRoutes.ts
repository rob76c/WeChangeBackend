import {Router} from 'express';

const router= Router()

//Post CRUD

//Create Post
router.post('/', (req, res) => {
    res.status(501).json({error: 'N0t Implemented'});
})

//List Post
router.get('/', (req, res) => {
    res.status(501).json({error: 'Not Implemented'});
})

//Get One Post
router.get('/:id', (req, res) => {
    const{id}= req.params;
    res.status(501).json({error: `Not Implemented: ${id}` });
})

//Update Post
router.put('/:id', (req, res) => {
    const{id}= req.params;
    res.status(501).json({error: `Not Implemented: ${id}` });
})

//Delete Post
router.delete('/:id', (req, res) => {
    const{id}= req.params;
    res.status(501).json({error: `Not Implemented: ${id}` });
})

export default router;