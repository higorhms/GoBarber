import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import routes from './routes';

import './database/index';
import multerConfig from './config/multerConfig';
import globalErrorsHandlerMiddleware from './middlewares/GlobalErrorsHandlerMiddleware';

const server = express();

server.use(express.json());
server.use('/files', express.static(multerConfig.directory));
server.use(routes);

server.use(globalErrorsHandlerMiddleware);

server.listen(3333, () => {
  console.log('Server started on port 3333');
});
