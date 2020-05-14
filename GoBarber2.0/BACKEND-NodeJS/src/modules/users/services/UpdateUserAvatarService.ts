import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import multerConfig from '@config/multerConfig';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
  user_id: string;
  fileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, fileName }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatars');
    }

    if (user.avatar) {
      const userAvatarPath = path.join(multerConfig.directory, user.avatar);
      const userAvatarPathExist = fs.promises.stat(userAvatarPath);

      if (userAvatarPathExist) {
        fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = fileName;

    const savedUser = await userRepository.save(user);

    delete user.password;

    return savedUser;
  }
}

export default UpdateUserAvatarService;
