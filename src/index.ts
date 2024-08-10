import express from 'express';
import userRoutes from './routes/userRoutes'
import WeChangeRoutes from './routes/WeChangeRoutes'

const app= express();
app.use(express.json());
app.use('/user', userRoutes);
app.use('/post', WeChangeRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});


app.listen(3000, () => {
    console.log('Server ready at localhost:3000')
})

