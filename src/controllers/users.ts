import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import findByUsername, { findByAccount } from '../helpers/utilsDatabase';
import IErrorResponse from '../interfaces/IErrorResponse';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';
import { userCashOut } from '../services/service.balance';
import transactionHistory from '../services/service.transactions';
import { createUser, loginUser } from '../services/service.users';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = await createUser(req.body);

  const userError = user as IErrorResponse;
  if (userError?.error) return next(user);
  const { id, username } = user as unknown as IUser;
  return res.status(StatusCodes.CREATED).json({ id, username });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const token = await loginUser(req.body);
  return res.status(StatusCodes.CREATED).json({ token });
};

const getBalance = async (account: IToken, req: Request, res: Response, _: NextFunction)
  : Promise<Response> => {
  const response = await findByAccount(account.accountId);
  if (!response) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token do usuário Inválido' });
  }
  return res.status(StatusCodes.OK).json(response);
};

const cashOut = async (account: IToken, req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> => {
  const receiverUser = await findByUsername(req.body.username);
  if (!receiverUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Usuário não existe' })
  }
  const user = await userCashOut(account, req.body);
  const userError = user as IErrorResponse;
  if (userError?.error) return next(user);

  return res.status(StatusCodes.ACCEPTED).json()
}

const transactions = async (account: IToken, req: Request, res: Response, _: NextFunction)
  : Promise<Response | void> => {
  const { type } = req.query;
  const { date } = req.body;
  const historic = await transactionHistory(account.id, type, date);
  return res.status(StatusCodes.OK).json(historic)
}

export {
  create, login, getBalance, cashOut, transactions
};
