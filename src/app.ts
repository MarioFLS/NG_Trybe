import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from '../docs/swagger'
import server from './server';
import 'dotenv/config';
import 'express-async-errors';
import userRouter from './routes/route.users';
import errorResponse from './middleware/middleware.error';

const port = process.env.APP_PORT || 3002;

server.use(cors());
server.use(userRouter);

server.all('/docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
server.all('*', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

server.use(errorResponse);
server.listen(port, () => console.log('Olá, você está na porta', port));
