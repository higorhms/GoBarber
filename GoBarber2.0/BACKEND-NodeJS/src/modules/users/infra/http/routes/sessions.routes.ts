import { Router, Request, Response } from 'express';

import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const usersRepository = new UsersRepository();

  const { email, password } = request.body;
  const sessionsService = new CreateSessionsService(usersRepository);

  const { user, token } = await sessionsService.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
