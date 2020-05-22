import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', ForgotPasswordController.create);
passwordRouter.post('/reset', ResetPasswordController.create);

export default passwordRouter;
