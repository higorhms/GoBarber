import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import * as UserActions from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.data;

        const profile = {
            name,
            email,
            avatar_id,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);

        Alert('User updated with sucess');
        yield put(UserActions.updateProfileSucess(response.data));
    } catch (error) {
        Alert('Something wrong happened, please try again.');
        yield put(UserActions.updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
