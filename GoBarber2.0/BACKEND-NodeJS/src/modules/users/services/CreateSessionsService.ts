import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import {
  ICreateSessionRequestDTO,
  ICreateSessionResponseDTO,
} from '../dtos/ISessionsDTO';

class CreateSessionsService {
  private usersRepository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository;
  }

  public async execute({
    email,
    password,
  }: ICreateSessionRequestDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Please check your email and password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Please check your email and password', 401);
    }

    delete user.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
