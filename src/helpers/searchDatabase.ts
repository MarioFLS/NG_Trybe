import Accounts from '../database/models/accounts';
import Users from '../database/models/users';

const findByUsername = async (username: string) => Users.findOne({ where: { username } });

const findByAccount = async (accountId: number) => Accounts
  .findOne({ where: { id: accountId } });

export default findByUsername;
export { findByAccount };
