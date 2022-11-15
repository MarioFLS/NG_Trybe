import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: 'NG_trybe',
  host: 'localhost',
  port: 5430,
  dialect: 'postgres',
};

export = config;
