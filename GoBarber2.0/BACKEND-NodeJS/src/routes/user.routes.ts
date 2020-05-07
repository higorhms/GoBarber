import { Router, Request, Response } from 'express';

const userRoutes = Router();

userRoutes.post('/', (request: Request, response: Response) => {
  const { name, email } = request.body;

  const user = { name, email };

  return response.json(user);
});

export default userRoutes;
