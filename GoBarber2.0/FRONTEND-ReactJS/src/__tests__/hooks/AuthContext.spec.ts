import { renderHook } from '@testing-library/react-hooks';
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

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'gobarber@example.com',
      password: '123456',
    });

    expect(storageSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token,
    );
    expect(storageSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user),
    );

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('gobarber@example.com');
  });
});
