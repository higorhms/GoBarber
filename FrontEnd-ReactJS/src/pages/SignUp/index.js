import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '~/assets/logo.svg';

export default function SignUp() {
    return (
        <>
            <img src={Logo} alt="Gobarber" />
            <form>
                <input type="email" placeholder="E-mail" />
                <input placeholder="Nome completo" />
                <input type="password" placeholder="Password" />
                <button type="submit">Criar conta</button>
                <Link to="/">Já possuo conta</Link>
            </form>
        </>
    );
}
