import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/AuthContext';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);

describe('Auth hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'uuid',
        name: 'Gobarber',
        email: 'gobarber@example.com',
      },
      token: 'token-example',
    };

    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');

    mockedApi.onPost('sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate, wait } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'gobarber@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(storageSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token,
    );
    expect(storageSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toBe('gobarber@example.com');
  });

  it('Should be able recover the stored data when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-example';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'uuid',
            name: 'Gobarber',
            email: 'gobarber@example.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toBe('gobarber@example.com');
  });

  it('Should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-example';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'uuid',
            name: 'Gobarber',
            email: 'gobarber@example.com',
          });
        default:
          return null;
      }
    });

    const storageSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(storageSpy).toHaveBeenCalledTimes(2);
  });

  it('Should be able to update the stored user', async () => {
    const user = {
      id: 'uuid',
      name: 'Gobarber',
      email: 'gobarber@example.com',
      avatar_url: 'test-image.jpg',
    };

    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(storageSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user.email).toBe('gobarber@example.com');
  });
});
