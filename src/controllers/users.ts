import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findByAccount } from '../helpers/searchDatabase';
import IAccount from '../interfaces/IAccount';
import IErrorResponse from '../interfaces/IErrorResponse';
import IUser from '../interfaces/IUser';
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

const getBalance = async (account: IUser, req: Request, res: Response, _: NextFunction)
  : Promise<Response> => {
  const response = await findByAccount(account.accountId);
  return res.status(StatusCodes.OK).json(response);
};

export { create, login, getBalance };
