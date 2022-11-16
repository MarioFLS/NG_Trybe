import { StatusCodes } from 'http-status-codes';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET = process.env.SECRET || 'chaveMuitoScreteta';
const validateToken = (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  let tokenUser = authorization?.trim() as string;
  if (authorization?.includes('Bearer')) {
    tokenUser = authorization?.split('Bearer')[1].trim();
  }

  const message = 'Esse token está inválido, não pertece a nenhum usuario';

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'Você precisa inserir um token para seguir adiante.',
      });
  }

  try {
    const token = jwt.verify(tokenUser, SECRET);
    return next(token);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

export default validateToken;
