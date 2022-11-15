import server from './server';
import 'dotenv/config';
import 'express-async-errors';
import userRouter from './routes/route.users';
import errorResponse from './middleware/middleware.error';

const port = process.env.APP_PORT || 3002;

server.get('/', (req, res) => res.status(200).send('Rodando'));

server.use(userRouter);

server.use(errorResponse);
server.listen(port, () => console.log('Olá, você está na porta', port));
