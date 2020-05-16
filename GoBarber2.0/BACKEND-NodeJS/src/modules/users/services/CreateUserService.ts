import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository;
  }

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('This e-mail is already used', 401);
    }

    const hashedPassword = await hash(password, 8);

    const savedUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return savedUser;
  }
}

export default CreateUserService;
