import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update an avatar', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );

    const updateAvatarService = new UpdateUserAvatarService(
      usersRepository,
      fakeStorageProvider,
    );

    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(updatedUser.avatar === 'avatar.jpg');
  });

  it('should be able to update avatar from unexisting user', async () => {
    const usersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatarService = new UpdateUserAvatarService(
      usersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const usersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const usersService = new CreateUsersService(
      usersRepository,
      fakeHashProvider,
    );

    const updateAvatarService = new UpdateUserAvatarService(
      usersRepository,
      fakeStorageProvider,
    );

    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar === 'avatar2.jpg');
  });
});
