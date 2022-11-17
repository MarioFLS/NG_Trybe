import express from 'express';
import {
  getBalance, create, login, cashOut, transactions, deposit, withdrawal,
} from '../controllers/users';
import validateLogin from '../middleware/validate.login';
import validateToken from '../middleware/validate.token';

const userRouter = express.Router();

userRouter.post('/', create);
userRouter.post('/login', validateLogin, login);
userRouter.get('/balance', validateToken, getBalance);
userRouter.post('/cashOut', validateToken, cashOut);
userRouter.get('/transactions', validateToken, transactions);
userRouter.post('/deposit', validateToken, deposit);
userRouter.post('/withdrawal', validateToken, withdrawal);

export default userRouter;
