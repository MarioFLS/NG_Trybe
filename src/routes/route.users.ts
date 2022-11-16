import express from 'express';
import { create, login } from '../controllers/users';
import validateLogin from '../middleware/validateLogin';

const userRouter = express.Router();

userRouter.post('/', create);
userRouter.post('/login', validateLogin, login);

export default userRouter;
