import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IErrorResponse from '../interfaces/IErrorResponse';
import { createUser } from '../services/service.users';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = await createUser(req.body);

  const userError = user as IErrorResponse;
  if (userError?.error) return next(user);
  return res.status(StatusCodes.CREATED).json(user);
};

export { create };
