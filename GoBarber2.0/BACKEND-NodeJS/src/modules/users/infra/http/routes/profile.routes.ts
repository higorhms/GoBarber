import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(authMiddleware);
profileRouter.get('/', ProfileController.show);
profileRouter.put('/', ProfileController.update);

export default profileRouter;
