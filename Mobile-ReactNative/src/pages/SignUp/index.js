import React from 'react';
import { Image } from 'react-native';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

import Background from '~/components/Background';
import logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Name"
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-adress"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="E-mail"
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Password"
                    />
                    <SubmitButton onPress={() => {}}>
                        Create a account
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Already have a account</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
