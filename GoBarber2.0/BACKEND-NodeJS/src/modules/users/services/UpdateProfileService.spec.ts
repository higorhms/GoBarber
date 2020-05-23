import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let usersService: CreateUsersService;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    usersService = new CreateUsersService(usersRepository, fakeHashProvider);
    updateProfileService = new UpdateProfileService(
      usersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update an user', async () => {
    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John The',
      email: 'johnthre@example.com',
    });

    expect(updatedUser.name).toBe('John The');
    expect(updatedUser.email).toBe('johnthre@example.com');
  });

  it('should not be able to update the email for a email already used for another user', async () => {
    await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const user = await usersService.execute({
      name: 'test',
      email: 'test@johndoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John The',
        email: 'johndoe@johndoe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John The',
      email: 'johnthre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John The',
        email: 'johnthre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John The',
        email: 'johnthre@example.com',
        old_password: 'wrong-old-password',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
