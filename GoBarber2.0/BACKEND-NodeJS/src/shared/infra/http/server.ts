import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes/index';
import '@shared/container';
import '../typeorm/index';

import globalErrorsHandlerMiddleware from '@shared/infra/http/middlewares/GlobalErrorsHandlerMiddleware';
import multerConfig from '@config/upload';
import rateLimiter from './middlewares/RateLimiterMiddleware';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(multerConfig.uploadsFolder));
server.use(rateLimiter);
server.use(routes);

server.use(errors());

server.use(globalErrorsHandlerMiddleware);
server.listen(3333, () => {
  console.log('Server started on port 3333');
});
