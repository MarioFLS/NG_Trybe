import { StatusCodes } from 'http-status-codes';
import { findByAccount, updateBalance } from '../helpers/utilsDatabase';
import IToken from '../interfaces/IToken';

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

export { userCashOut, Data }
