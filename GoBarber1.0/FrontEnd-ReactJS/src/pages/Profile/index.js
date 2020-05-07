import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';
import * as UserActions from '~/store/modules/user/actions';
import * as AuthActions from '~/store/modules/auth/actions';
import AvatarInput from './Avatar';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(UserActions.updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(AuthActions.signOut());
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input name="name" placeholder="Nome completo" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu endereço de email"
                />

                <hr />

                <Input name="oldPassword" placeholder="Senha atual" />
                <Input name="password" placeholder="Nova Senha" />
                <Input
                    name="confirmPassword"
                    placeholder="Confirmação da senha"
                />
                <button type="submit">Atualizar Perfil</button>
            </Form>
            <button type="submit" onClick={handleSignOut}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
