import Accounts from '../database/models/accounts';
import Users from '../database/models/users';
import IToken from '../interfaces/IToken';
import db from '../database/models';
import Transactions from '../database/models/transactions';

const findByUsername = async (username: string) => Users.findOne({ where: { username } });

const findByAccount = async (accountId: number) => Accounts
  .findOne({ where: { id: accountId } });

const updateBalance = async (token:IToken, username: string, balance: number) => {
  const user = await findByUsername(username);
  const id = user?.dataValues.accountId

  return db.transaction(async (t) => {
    await Accounts.decrement(
      { balance },
      { where: { id: token.accountId }, transaction: t }
    );

    await Accounts.increment({ balance }, { where: { id }, transaction: t });
    return Transactions
      .create(
        { debitedAccountId: token.accountId, creditedAccountId: id, value: balance },
        { transaction: t }
      ).catch((e) => console.log(e))
  })
}

export default findByUsername;
export { findByAccount, updateBalance };
