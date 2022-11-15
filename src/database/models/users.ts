import { Model, INTEGER, STRING } from 'sequelize';
import Accounts from './accounts';
import db from './index';
class Users extends Model {}
Users.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    username: STRING,
    password: STRING,
    accountId: INTEGER,
  },
  {
    modelName: 'Users',
    timestamps: false,
    sequelize: db,
    underscored: true,
  }
);

Users.belongsTo(Accounts, { as: 'user', foreignKey: 'id' });
Accounts.hasOne(Users, { as: 'account', foreignKey: 'account_id' });

export default Users;
