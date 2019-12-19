import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import Logo from '~/assets/logo.svg';

export default function SignUp() {
    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <>
            <img src={Logo} alt="Gobarber" />
            <Form onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="E-mail" />
                <Input name="password" type="password" placeholder="Password" />
                <button type="submit">Criar conta</button>
                <Link to="/">Já possuo conta</Link>
            </Form>
        </>
    );
}
