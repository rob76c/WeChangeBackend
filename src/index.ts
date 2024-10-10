import express from 'express';
import userRoutes from './routes/userRoutes'
import WeChangeRoutes from './routes/WeChangeRoutes'
import authRoutes from './routes/authRoutes'
import { authenticateToken } from './middlewares/authMiddleware';

const app= express();
app.use(express.json());
app.use('/user', authenticateToken, userRoutes);
app.use('/post', authenticateToken, WeChangeRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});


app.listen(3000, () => {
    console.log('Server ready at localhost:3000')
});

