import { Model, INTEGER, STRING } from 'sequelize';
import Accounts from './accounts';
import db from './index';
class Users extends Model {}
Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: STRING,
    password: STRING,
    accountId: INTEGER,
  },
  {
    modelName: 'users',
    timestamps: false,
    sequelize: db,
    underscored: true,
  }
);

Users.belongsTo(Accounts, { as: 'user', foreignKey: 'id' });
Accounts.hasOne(Users, { as: 'account', foreignKey: 'account_id' });

export default Users;
