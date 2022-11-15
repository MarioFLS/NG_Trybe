import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from './index';
class Accounts extends Model {}
Accounts.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    balance: DECIMAL,
  },
  {
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
  }
);

export default Accounts;
