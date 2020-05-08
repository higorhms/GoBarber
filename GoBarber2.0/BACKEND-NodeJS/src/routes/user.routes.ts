import { Router, Request, Response } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import authMiddleware from '../middlewares/authMiddleware';
import multerConfig from '../config/multerConfig';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      fileName: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
