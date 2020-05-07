import { Router, Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const sessionsService = new CreateSessionsService();

    const { user, token } = await sessionsService.execute({ email, password });

    return response.json({ user, token });
  } catch (error) {
    return response.json({ error: error.message });
  }
});

export default sessionsRouter;
