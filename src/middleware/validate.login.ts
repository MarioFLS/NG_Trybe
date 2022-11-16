import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { compareHashPassword } from '../helpers/hashPassword';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const hash = await compareHashPassword(req.body)
  if (!hash) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Senha ou usuário incorretos' })
  }
  return next();
};

export default validateLogin;
