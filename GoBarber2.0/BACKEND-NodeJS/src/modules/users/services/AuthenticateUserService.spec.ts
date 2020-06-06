import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let usersService: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    authenticateUser = new AuthenticateUserService(
      usersRepository,
      fakeHashProvider,
    );
    usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to authenticate', async () => {
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
    await expect(
      authenticateUser.execute({
        email: 'johndoe@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
