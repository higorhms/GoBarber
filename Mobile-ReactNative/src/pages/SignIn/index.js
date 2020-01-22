import React, { useRef } from 'react';
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

export default function SignIn({ navigation }) {
    const passwordRef = useRef();

    function handleSubmit() {}

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="E-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Password"
                        returnKeyType="nexsendt"
                        onSubmitEditing={handleSubmit}
                        ref={passwordRef}
                    />
                    <SubmitButton onPress={() => {}}>Login</SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignUp')}>
                    <SignLinkText>Create an account</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
