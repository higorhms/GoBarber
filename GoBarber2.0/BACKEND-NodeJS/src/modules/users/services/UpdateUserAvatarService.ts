import fs from 'fs';
import path from 'path';

import multerConfig from '@config/multerConfig';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  fileName: string;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository;
  }

  public async execute({ user_id, fileName }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    const savedUser = await this.usersRepository.save(user);

    delete user.password;

    return savedUser;
  }
}

export default UpdateUserAvatarService;
