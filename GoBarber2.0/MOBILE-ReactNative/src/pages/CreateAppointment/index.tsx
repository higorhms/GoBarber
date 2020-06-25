import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Platform, Alert } from 'react-native';

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

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();
  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, [setProviders]);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, selectedProvider, setAvailability]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((lastState) => !lastState);
  }, [setShowDatePicker]);

  const handleSelectProvider = useCallback(
    (id: string) => {
      setSelectedProvider(id);
    },
    [setSelectedProvider],
  );

  const handleDateChanged = useCallback((event, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate]);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </S.BackButton>

        <S.HeaderTitle>Cabeleireiros</S.HeaderTitle>
        <S.UserAvatar source={{ uri: user.avatar_url }} />
      </S.Header>

      <S.Content>
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
        <S.Calendar>
          <S.Title>Escola a data</S.Title>
          <S.OpenDatePickerButton onPress={handleToggleDatePicker}>
            <S.OpenDatePickerButtonText>
              Selecionar outra data
            </S.OpenDatePickerButtonText>
          </S.OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              textColor="#f4ede8"
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </S.Calendar>

        <S.Schedule>
          <S.Title>Escolha o horário</S.Title>

          <S.Section>
            <S.SectionTitle>Manhã</S.SectionTitle>

            <S.SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <S.Hour
                  enabled={available}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                  selected={selectedHour === hour}
                >
                  <S.HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </S.HourText>
                </S.Hour>
              ))}
            </S.SectionContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tarde</S.SectionTitle>

            <S.SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, available, hour }) => (
                  <S.Hour
                    enabled={available}
                    key={hourFormatted}
                    available={available}
                    onPress={() => handleSelectHour(hour)}
                    selected={selectedHour === hour}
                  >
                    <S.HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </S.HourText>
                  </S.Hour>
                ),
              )}
            </S.SectionContent>
          </S.Section>
        </S.Schedule>

        <S.CreateAppointmentButton onPress={handleCreateAppointment}>
          <S.CreateAppointmentButtonText>Agendar</S.CreateAppointmentButtonText>
        </S.CreateAppointmentButton>
      </S.Content>
    </S.Container>
  );
};

export default CreateAppointment;
