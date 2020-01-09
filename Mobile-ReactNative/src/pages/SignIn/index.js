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

export default function SignIn() {
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-adress"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Type your email"
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Type your email"
                    />
                    <SubmitButton onPress={() => {}}>Login</SubmitButton>
                </Form>

                <SignLink onPress={() => {}}>
                    <SignLinkText>Create a account</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
