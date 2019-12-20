import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import * as AuthActions from '~/store/modules/auth/actions';
import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('Insira um nome válido'),
    email: Yup.string()
        .email()
        .required('Insira um e-mail válido'),
    password: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Insira uma senha válida'),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(AuthActions.signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={Logo} alt="Gobarber" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Password" />
                <button type="submit">Criar conta</button>
                <Link to="/">Já possuo conta</Link>
            </Form>
        </>
    );
}
