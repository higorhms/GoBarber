import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateSessionsService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const sessionsService = new CreateSessionsService(
      usersRepository,
      fakeHashProvider,
    );
    const usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );

    await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const response = await sessionsService.execute({
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toBe('johndoe@johndoe.com');
  });
});
