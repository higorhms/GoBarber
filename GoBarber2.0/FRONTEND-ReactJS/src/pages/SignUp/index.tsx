import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import { Container, Content, ImageBackground } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <ImageBackground />
      <Content>
        <img src={logo} alt="logo" />
        <form>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <a href="forgot">
          <FiArrowLeft />
          Já possuo um cadastro
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
