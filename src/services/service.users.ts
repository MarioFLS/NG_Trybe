import { StatusCodes } from 'http-status-codes';
import Users from '../database/models/users';
import IErrorResponse from '../interfaces/IErrorResponse';
import ICreateUser from '../interfaces/ICreateUser';
import Accounts from '../database/models/accounts';
import db from '../database/models';

const createUser = async (
  data: ICreateUser
): Promise<Users | IErrorResponse | void> => {
  if (!data) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'Insira os dados do User',
      },
    };
  }

  try {
    return await db.transaction(async (t) => {
      const account = await (
        await Accounts.create({ balance: 100.0 }, { transaction: t })
      ).dataValues.id;

      const user = await Users.create(
        { ...data, account_id: account },
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
