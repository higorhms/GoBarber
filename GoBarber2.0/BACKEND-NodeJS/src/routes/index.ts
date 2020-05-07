import { Router, Request, Response } from 'express';
import appoitmentRoutes from './appointments.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/appointments', appoitmentRoutes);
routes.use('/users', userRoutes);

routes.get('/', (request: Request, response: Response) =>
  response.json({ message: 'Hello GoStack' }),
);

export default routes;
