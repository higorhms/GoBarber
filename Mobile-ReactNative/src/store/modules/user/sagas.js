import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import * as UserActions from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;

        const profile = {
            name,
            email,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);

        yield put(UserActions.updateProfileSucess(response.data));
    } catch (error) {
        yield put(UserActions.updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
