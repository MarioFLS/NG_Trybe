import express from 'express';
import { create } from '../controllers/users';

const userRouter = express.Router();

userRouter.post('/', create);

export default userRouter;
