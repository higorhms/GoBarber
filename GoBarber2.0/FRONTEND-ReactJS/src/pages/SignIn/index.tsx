import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import { Container, Content, ImageBackground } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <form>
          <h1>Faça seu logon</h1>
          <input placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <button type="submit">Entrar</button>
          <a href="forgot">Esqueci minha senha</a>
        </form>
        <a href="forgot">
          <FiLogIn />
          Criar minha conta
        </a>
      </Content>
      <ImageBackground />
    </Container>
  );
};

export default SignIn;
