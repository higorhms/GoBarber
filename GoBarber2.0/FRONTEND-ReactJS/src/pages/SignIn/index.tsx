import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import { Container, Content, ImageBackground } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import AuthContext from '../../context/authContext';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const authContext = useContext(AuthContext);
  console.log(authContext);
  const handleSubmit = useCallback(async (data: object) => {
    formRef.current?.setErrors({});

    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('Valid e-mail is required').email(),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="signup">
          <FiLogIn />
          Criar minha conta
        </a>
      </Content>
      <ImageBackground />
    </Container>
  );
};

export default SignIn;
