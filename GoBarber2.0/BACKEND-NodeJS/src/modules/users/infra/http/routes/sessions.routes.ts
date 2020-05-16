import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionsController.create);

export default sessionsRouter;
