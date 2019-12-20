import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as AuthActions from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', { email, password });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Unauthorized, this user is not a provider.');
            yield put(AuthActions.signFailure());
            return;
        }

        yield put(AuthActions.signInSucess(token, user));
        history.push('/dashboard');
    } catch (error) {
        toast.error(
            'Autentication fail, please check your email and password.'
        );
        yield put(AuthActions.signFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
