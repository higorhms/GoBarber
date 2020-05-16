import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import multerConfig from '@config/multerConfig';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const userService = container.resolve(CreateUserService);

  const user = await userService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      fileName: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
