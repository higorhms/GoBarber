import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database/index';
import multerConfig from './config/multerConfig';

const server = express();

server.use(express.json());
server.use('/files', express.static(multerConfig.directory));
server.use(routes);

server.listen(3333, () => {
  console.log('Server started on port 3333');
});
