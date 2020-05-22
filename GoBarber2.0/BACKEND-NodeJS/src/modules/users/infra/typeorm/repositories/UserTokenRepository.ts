import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    const savedToken = await this.ormRepository.save(userToken);

    return savedToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }
}

export default UserTokenRepository;
