import console from 'console';
import { Op } from 'sequelize'
import Transactions from '../database/models/transactions'
import ITransaction from '../interfaces/ITransaction';

const transactionType = async <T>(id: number, type: T) => {
  if (type === 'out') {
    return Transactions.findAll({
      where: { debitedAccountId: id }
    });
  }
  if (type === 'in') {
    return Transactions.findAll({
      where: { creditedAccountId: id }
    });
  }

  return null;
}

const transactionDate = async (historic: ITransaction[], date: Date) => historic
  .filter(({ createdAt }) => {
    const dateHistoric = new Date(createdAt);
    if (date.getUTCDay() === dateHistoric.getUTCDay()) {
      return true;
    }
    return false;
  })

const transactionHistory = async <T>(id: number, type: T, date:string) => {
  const historicType = await transactionType(id, type) as unknown as ITransaction[];
  const originalDate = new Date(date);

  if (historicType) {
    if (date) {
      transactionDate(historicType, originalDate);
    }
    return historicType
  }
  const allTransactions = await Transactions.findAll({
    where: {
      [Op.or]:
        [{ debitedAccountId: id },
          { creditedAccountId: id }
        ]
    }
  }) as unknown as ITransaction[];
  if (date) {
    return transactionDate(allTransactions, originalDate)
  }
  return allTransactions;
}

export default transactionHistory;
