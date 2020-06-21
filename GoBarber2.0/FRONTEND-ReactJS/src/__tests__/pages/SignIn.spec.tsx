import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedPushFunction = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedPushFunction,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/AuthContext', () => ({
  useAuth: () => ({
    signIn: jest.fn(),
  }),
}));

describe('SignIn Page', () => {
  it('should be able to render SignIn Page', () => {
    const { debug } = render(<SignIn />);

    debug();
  });

  it('should be able to fill the form and signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedPushFunction).toHaveBeenCalledWith('/dashboard');
    });
  });
});
