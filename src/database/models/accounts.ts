import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from './index';
class Accounts extends Model {}
Accounts.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    balance: DECIMAL,
  },
  {
    sequelize: db,
    modelName: 'Accounts',
  }
);

export default Accounts;
