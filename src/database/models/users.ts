import { Model, INTEGER, STRING } from 'sequelize';
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

export default Users;
