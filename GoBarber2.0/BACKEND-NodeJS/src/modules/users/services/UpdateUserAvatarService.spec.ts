import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeHashProvider: FakeHashProvider;
let usersRepository: FakeUsersRepository;
let usersService: CreateUsersService;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    usersService = new CreateUsersService(usersRepository, fakeHashProvider);
  });
  updateAvatarService = new UpdateUserAvatarService(
    usersRepository,
    fakeStorageProvider,
  );

  it('should be able to update an avatar', async () => {
    const user = await usersService.execute({
      name: 'johndoe',
      email: 'johndoe@johndoe.com',
      password: '123456',
    });

    const updatedUser = await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await expect(updatedUser.avatar === 'avatar.jpg');
  });

  it('should be able to update avatar from unexisting user', async () => {
    await expect(
      updateAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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

    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    await expect(user.avatar === 'avatar2.jpg');
  });
});
