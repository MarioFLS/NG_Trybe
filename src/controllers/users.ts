import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IErrorResponse from '../interfaces/IErrorResponse';
import IUser from '../interfaces/IUser';
import { createUser } from '../services/service.users';

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

export { create };
