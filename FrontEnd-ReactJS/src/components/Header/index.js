import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Content, Profile } from './styles';
import Logo from '~/assets/logo-purple.svg';
import Notifications from '../Notifications';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={Logo} alt="Gobarber" />
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">My profile</Link>
                        </div>
                        <img
                            src={
                                (profile.avatar && profile.avatar.url) ||
                                'https://api.adorable.io/avatars/50/abott@adorable.png'
                            }
                            alt={profile.name}
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
