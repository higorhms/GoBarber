import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );

    const user = await createUsersService.execute({
      name: 'John doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users using the same email', async () => {
    const usersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );

    await createUsersService.execute({
      name: 'John doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(
      createUsersService.execute({
        name: 'John doe',
        email: 'johndoe@johndoe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
