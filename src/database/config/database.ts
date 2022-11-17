import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.DB_TEST || 'NG_trybe',
  host: 'localhost',
  port: Number(process.env.DB_PORT_TEST) || 5430,
  dialect: 'postgres',
};

export = config;
