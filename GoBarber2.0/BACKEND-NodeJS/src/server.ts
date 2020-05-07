import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database/index';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3334, () => {
  console.log('Server started on port 3333');
});
