import { StatusCodes } from 'http-status-codes';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import Users from '../database/models/users';
import IErrorResponse from '../interfaces/IErrorResponse';
import ICreateUser from '../interfaces/ICreateUser';
import Accounts from '../database/models/accounts';
import db from '../database/models';
import validateCreateUser from './validate.user';
import hashPasswordDB from '../helpers/hashPassword';
import ILogin from '../interfaces/ILogin';
import findByUsername from '../helpers/utilsDatabase';
import IUser from '../interfaces/IUser';

const SECRET = process.env.SECRET || 'chaveMuitoScreteta';

const createUser = async (
  data: ICreateUser
): Promise<Users | IErrorResponse> => {
  const { username, password } = data;

  const validate = (await validateCreateUser(data)) as IErrorResponse;
  const validateError = validate?.error;

  const hashPassword = hashPasswordDB(password);
  if (validateError) return validate;

  try {
    return await db.transaction(async (t) => {
      const account = await (
        await Accounts.create({ balance: 100.0 }, { transaction: t })
      ).dataValues.id;

      const user = await Users.create(
        {
          username: username.trim(),
          password: hashPassword,
          accountId: account,
        },
        { transaction: t }
      );
      return user.toJSON();
    });
  } catch (error) {
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Insira os dados do usuário corretamente, nome e password',
      },
    };
  }
};

const loginUser = async (data: ILogin) => {
  const { username } = data;
  const { accountId, id } = await findByUsername(username) as unknown as IUser;
  return jwt.sign({ username, accountId, id }, SECRET, { expiresIn: '24h' });
};

export { createUser, loginUser };
