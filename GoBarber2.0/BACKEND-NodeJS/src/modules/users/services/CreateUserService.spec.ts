import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUsersService(usersRepository);

    const user = await createUsersService.execute({
      name: 'John doe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users using the same email', async () => {
    const usersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUsersService(usersRepository);

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
