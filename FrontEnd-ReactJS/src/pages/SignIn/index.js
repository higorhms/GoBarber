import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import * as AuthActions from '~/store/modules/auth/actions';

import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Insita um e-mail válido'),
    password: Yup.string().required('Insita uma senha válida'),
});

export default function SignIn() {
    const dispatch = useDispatch();

    function handleSubmit({ email, password }) {
        dispatch(AuthActions.signInRequest(email, password));
    }

    return (
        <>
            <img src={Logo} alt="Gobarber" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Password" />
                <button type="submit">Acessar</button>
                <Link to="/register">Criar conta</Link>
            </Form>
        </>
    );
}
