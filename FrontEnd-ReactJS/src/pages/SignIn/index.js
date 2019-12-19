import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import Logo from '~/assets/logo.svg';

export default function SignIn() {
    return (
        <>
            <img src={Logo} alt="Gobarber" />
            <form>
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Password" />
                <button type="submit">Acessar</button>
                <Link to="/register">Criar conta</Link>
            </form>
        </>
    );
}
