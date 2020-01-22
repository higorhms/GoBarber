import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Profile() {
    return (
        <Background>
            <Text>Profile</Text>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};
