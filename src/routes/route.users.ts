import express from 'express';
import {
  getBalance, create, login, cashOut, transactions, deposit, withdrawal,
} from '../controllers/users';
import validateUser from '../middleware/validate.user';
import validateToken from '../middleware/validate.token';
import validateTransaction from '../middleware/validate.transaction';

const userRouter = express.Router();

userRouter.post('/', validateUser, create);
userRouter.post('/login', validateUser, login);
userRouter.get('/balance', validateToken, getBalance);
userRouter.post('/cashOut', validateTransaction, validateToken, cashOut);
userRouter.get('/transactions', validateToken, transactions);
userRouter.post('/deposit', validateTransaction, validateToken, deposit);
userRouter.post('/withdrawal', validateTransaction, validateToken, withdrawal);

export default userRouter;
