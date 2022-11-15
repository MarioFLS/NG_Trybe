import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from './index';

class Transactions extends Model {}
Transactions.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    debitedAccountId: INTEGER,
    creditedAccountId: INTEGER,
    value: DECIMAL,
  },
  {
    sequelize: db,
    modelName: 'Transactions',
    underscored: true,
  }
);

export default Transactions;
