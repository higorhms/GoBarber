import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import * as AuthActions from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (!user.provider) {
        console.tron.log('User não é um provider');
        return;
    }

    yield put(AuthActions.signInSucess(token, user));
    history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
