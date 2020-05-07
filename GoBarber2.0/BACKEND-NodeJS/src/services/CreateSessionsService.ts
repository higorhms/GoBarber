import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Please check your email and password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error('Please check your email and password');
    }

    delete user.password;

    const token = sign({}, '90f28b52b06cb5ee5670e0c308f525ec', {
      subject: user.id,
      expiresIn: '3d',
    });

    return { user, token };
  }
}

export default CreateSessionsService;
