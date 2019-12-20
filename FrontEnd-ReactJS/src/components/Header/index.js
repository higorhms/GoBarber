import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content, Profile } from './styles';
import Logo from '~/assets/logo-purple.svg';

export default function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={Logo} alt="Gobarber" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong>Higor Martins</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img
                            src="https://api.adorable.io/avatars/50/abott@adorable.png
"
                            alt="Higor Martins"
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
