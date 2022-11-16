import {
  Model, INTEGER, DECIMAL
} from 'sequelize';
import db from './index';

class Transactions extends Model {}
Transactions.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    debitedAccountId: INTEGER,
    creditedAccountId: INTEGER,
    value: DECIMAL,
  },
  {
    updatedAt: false,
    sequelize: db,
    modelName: 'transactions',
  }
);

export default Transactions;
