import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, [setProviders]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
    signOut();
  }, [signOut, navigation]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri:
                user.avatar_url ||
                'https://api.adorable.io/avatars/101/abott@adorable.png',
            }}
          />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        renderItem={({ item }) => <UserName>{item.name}</UserName>}
      />
    </Container>
  );
};

export default Dashboard;
