import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import * as S from './styles';

interface RouteParams {
  providerId: string;
}
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, [setProviders]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectProvider = useCallback(
    (id: string) => {
      setSelectedProvider(id);
    },
    [setSelectedProvider],
  );

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </S.BackButton>

        <S.HeaderTitle>Cabeleireiros</S.HeaderTitle>
        <S.UserAvatar source={{ uri: user.avatar_url }} />
      </S.Header>

      <S.ProvidersListContainer>
        <S.ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <S.ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <S.ProviderAvatar
                source={{
                  uri:
                    provider.avatar_url ||
                    'https://api.adorable.io/avatars/101/abott@adorable.png',
                }}
              />
              <S.ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </S.ProviderName>
            </S.ProviderContainer>
          )}
        />
      </S.ProvidersListContainer>
    </S.Container>
  );
};

export default CreateAppointment;
