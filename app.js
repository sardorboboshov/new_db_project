import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import hospitalRouter from './routes/hospitalRouter.js';
const app = express();

app.use(express.json());

dotenv.config({ path: './.env' });

app.use('/api/v1', userRouter);
app.use('/api/v1', hospitalRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
