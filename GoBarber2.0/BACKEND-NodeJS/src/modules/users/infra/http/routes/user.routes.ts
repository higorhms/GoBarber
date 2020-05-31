import { Router } from 'express';

import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import authMiddleware from '../middlewares/authMiddleware';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create,
);

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UserAvatarController.create,
);

export default usersRouter;
