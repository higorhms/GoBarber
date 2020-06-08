import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import {
  Container,
  Content,
  AnimationContainer,
  ImageBackground,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description:
            'Ocorreu um erro ao resetar a senha, por favor tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="logo" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password_confirmation"
              placeholder="Confirm Password"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <ImageBackground />
    </Container>
  );
};

export default ResetPassword;
