import { StatusCodes } from 'http-status-codes';
import Accounts from '../database/models/accounts';
import Users from '../database/models/users';
import IToken from '../interfaces/IToken';
import db from '../database/models';

const findByUsername = async (username: string) => Users.findOne({ where: { username } });

const findByAccount = async (accountId: number) => Accounts
  .findOne({ where: { id: accountId } });

const updateBalance = async (token:IToken, username: string, balance: number) => {
  const user = await findByUsername(username);
  const id = user?.dataValues.account_id

  await db.transaction(async (t) => {
    Accounts.increment({ balance }, { where: { id }, transaction: t });
    Accounts.decrement({ balance }, { where: { id: token.accountId }, transaction: t });
  })
}

export default findByUsername;
export { findByAccount, updateBalance };
