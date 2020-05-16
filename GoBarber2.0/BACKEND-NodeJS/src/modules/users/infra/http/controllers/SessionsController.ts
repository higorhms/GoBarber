import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionsService from '@modules/users/services/CreateSessionsService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionsService = container.resolve(CreateSessionsService);

    const { user, token } = await sessionsService.execute({ email, password });

    return response.json({ user, token });
  }
}

export default new SessionsController();
