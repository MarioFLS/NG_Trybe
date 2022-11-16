import express from 'express';
import {
  getBalance, create, login, cashOut
} from '../controllers/users';
import validateLogin from '../middleware/validate.login';
import validateToken from '../middleware/validate.token';

const userRouter = express.Router();

userRouter.post('/', create);
userRouter.post('/login', validateLogin, login);
userRouter.get('/balance', validateToken, getBalance);
userRouter.post('/cashOut', validateToken, cashOut)

export default userRouter;
