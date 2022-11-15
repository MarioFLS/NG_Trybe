import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/users';
import IErrorResponse from '../interfaces/IErrorResponse';
import ICreateUser from '../interfaces/ICreateUser';
import Accounts from '../database/models/accounts';
import db from '../database/models';
import { validateCreateUser } from './validateUser';

const createUser = async (
  data: ICreateUser
): Promise<Users | IErrorResponse> => {
  const { username, password } = data;

  const validate = (await validateCreateUser(data)) as IErrorResponse;
  const validateError = validate?.error;

  if (validateError) return validate;

  try {
    return await db.transaction(async (t) => {
      const account = await (
        await Accounts.create({ balance: 100.0 }, { transaction: t })
      ).dataValues.id;

      const user = await Users.create(
        { username: username.trim(), password, account_id: account },
        { transaction: t }
      );
      return user;
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

export { createUser };
