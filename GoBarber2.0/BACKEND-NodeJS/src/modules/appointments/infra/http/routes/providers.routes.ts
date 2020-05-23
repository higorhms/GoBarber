import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/authMiddleware';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(authMiddleware);

providersRouter.get('/', ProvidersController.index);

export default providersRouter;
