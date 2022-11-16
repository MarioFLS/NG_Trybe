import { Op } from 'sequelize'
import Transactions from '../database/models/transactions'

const transactionHistory = async (id:number) => {
  const historic = await Transactions.findAll({
    where: {
      [Op.or]:
        [{ debitedAccountId: id },
          { creditedAccountId: id }
        ]
    }
  }).catch((e) => console.log(e));

  return historic;
}

export default transactionHistory;
