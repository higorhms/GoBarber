// import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';
import * as AuthActions from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', { email, password });

        const { token, user } = response.data;

        if (user.provider) {
            Alert('Unauthorized, providers can only use the web application.');
            yield put(AuthActions.signFailure());
            return;
        }

        api.defaults.headers.Authorization = `Barear ${token}`;

        yield put(AuthActions.signInSucess(token, user));
    } catch (error) {
        Alert.alert(
            'Autentication fail, please check your email and password.'
        );
        yield put(AuthActions.signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
        });

        Alert.alert('Account created sucessfuly');
    } catch (error) {
        Alert.alert('Please check your informations and try again.');
        yield put(AuthActions.signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    api.defaults.headers.Authorization = `Barear ${token}`;
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
