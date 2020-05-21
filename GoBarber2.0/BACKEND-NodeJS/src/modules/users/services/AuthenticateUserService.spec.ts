import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
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

    const response = await authenticateUser.execute({
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toBe('johndoe@johndoe.com');
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
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

    await expect(
      authenticateUser.execute({
        email: 'johndoe@johndoe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an unexisting user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'johndoe@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
