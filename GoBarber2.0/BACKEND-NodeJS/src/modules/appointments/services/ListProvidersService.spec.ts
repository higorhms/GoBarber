import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListProvidersService from './ListProvidersService';

let usersRepository: FakeUsersRepository;
let usersService: CreateUsersService;
let listProvidersService: ListProvidersService;
let fakeHashProvider: FakeHashProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    usersRepository = new FakeUsersRepository();
    usersService = new CreateUsersService(usersRepository, fakeHashProvider);
    listProvidersService = new ListProvidersService(usersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await usersService.execute({
      name: 'Example 1',
      email: 'example1@example1.com',
      password: '123456',
    });

    const user2 = await usersService.execute({
      name: 'Exanple 2',
      email: 'example2@example2.com',
      password: '123456',
    });

    const loggedUser = await usersService.execute({
      name: 'loggedUser',
      email: 'LogedUser@LogedUser.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
