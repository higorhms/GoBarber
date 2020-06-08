import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';

import { Container, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="gobarber" />
          <Profile>
            <img
              src={
                user.avatar_url ||
                'https://api.adorable.io/avatars/80/abott@adorable.png'
              }
              alt={user.name}
            />
            <div>
              <span>Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
