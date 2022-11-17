import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import Accounts from '../database/models/accounts';
import { findByAccount, updateBalance } from '../helpers/utilsDatabase';
import db from '../database/models';
import IToken from '../interfaces/IToken';
import Users from '../database/models/users';

type Data = {
  username: string;
  value: number;
};

const userCashOut = async (token: IToken, data: Data) => {
  const { username, value } = data;
  if (token.username === data.username.trim()) {
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Você não pode transferir dinheiro para si mesmo!',
      },
    };
  }
  const balanceUser = await findByAccount(token.accountId);
  if (balanceUser?.dataValues.balance < value) {
    return {
      error: {
        code: StatusCodes.UNAUTHORIZED,
        message: `Seu saldo é inferior a ${value}!`,
      },
    };
  }
  try {
    await updateBalance(token, username, value);
  } catch (error) {
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Ocorreu um Erro na transação',
      },
    };
  }
};

const userDepoist = async (token: IToken, balance: number) => {
  const { accountId, id } = token;
  try {
    await db.transaction(async (t) => Accounts.increment(
      { balance },
      { where: { id: accountId }, transaction: t }
    ));
    return Users.findOne({ where: { id }, include: { model: Accounts, as: 'account' } });
  } catch (error) {
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Ocorreu um Erro na transação',
      },
    };
  }
}

const userWithdrawal = async (token: IToken, balance: number) => {
  const { accountId, id } = token;
  try {
    const withdrawal = await db.transaction(async (t) => Accounts.decrement(
      { balance },
      { where: { id: accountId, balance: { [Op.gte]: balance } }, transaction: t }
    ));
    if (withdrawal[0]) {
      return {
        error: {
          code: StatusCodes.NOT_ACCEPTABLE,
          message: 'Você não pode tentar sacar mais dinheiro do que você tem. '
          + 'Infelizmente',
        },
      };
    }
    return Users.findOne({ where: { id }, include: { model: Accounts, as: 'account' } });
  } catch (error) {
    return {
      error: {
        code: StatusCodes.NOT_ACCEPTABLE,
        message: 'Ocorreu um Erro na transação',
      },
    };
  }
}
export { userCashOut, userDepoist, userWithdrawal }
