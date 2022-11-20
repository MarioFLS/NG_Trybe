import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { compareHashPassword } from '../helpers/hashPassword';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  console.log(req.body)
  const url = req.url === '/login';

  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Precisa de um username e um password.' });
  }

  if (!url) {
    return next();
  }
  const hash = await compareHashPassword(req.body)
  if (!hash) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Senha ou usuário incorretos.' });
  }
  return next();
};

export default validateUser;
