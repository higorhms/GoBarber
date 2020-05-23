import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let createUsersService: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();

    createUsersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      name: 'John doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users using the same email', async () => {
    await createUsersService.execute({
      name: 'John doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      createUsersService.execute({
        name: 'John doe',
        email: 'johndoe@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
