import { Router, Request, Response } from 'express';

import appoitmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appoitmentRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/', (request: Request, response: Response) =>
  response.json({ message: 'Hello GoStack' }),
);

export default routes;
