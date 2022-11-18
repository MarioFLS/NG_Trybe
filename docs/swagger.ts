import 'dotenv/config';
import create from './create'
import getBalance from './getBalance';
import login from './login'
import cashOut from './cashOut'
const port = process.env.APP_PORT || 3002;

const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'API Do Banco',
    description: 'API guarda a informação das senhas, saldo e transações de cada usuário',
    version: '1.0.0',
  },
  servers: [{
    url: `http://localhost:${port}`,
    description: 'Servidor Local',
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  basePath: '/v1',
  paths: {
    '/': create,
    '/login': login,
    '/balance': getBalance,
    '/cashOut': cashOut,
    /*'/transactions': ,
    '/deposit:'
    '/withdrawal': , */
  },
};

export default swaggerConfig;
