import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const { username, value } = req.body;
  console.log(req.body)
  const url = req.url === '/cashOut';

  if (!url) {
    if (!value) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Precisa de um value.' });
    }
    return next();
  }
  if (!username || !value) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Precisa de um username e um value.' });
  }
  return next();
};

export default validateTransaction;
