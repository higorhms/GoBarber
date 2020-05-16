import { Router } from 'express';

import multer from 'multer';

import multerConfig from '@config/multerConfig';
import authMiddleware from '../middlewares/authMiddleware';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', UsersController.create);

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UserAvatarController.create,
);

export default usersRouter;
