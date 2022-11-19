import {
  Model, INTEGER, DECIMAL
} from 'sequelize';
import Accounts from './accounts';
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

Accounts.hasOne(
  Transactions,
  { as: 'transaction', foreignKey: 'id' }
);

Accounts.hasOne(
  Transactions,
  { as: 'transactionD', foreignKey: 'id' }
);

Transactions.belongsTo(
  Accounts,
  { as: 'debitedUser', foreignKey: 'debitedAccountId' }
);

Transactions.belongsTo(
  Accounts,
  { as: 'creditedUser', foreignKey: 'id' }
);

export default Transactions;
