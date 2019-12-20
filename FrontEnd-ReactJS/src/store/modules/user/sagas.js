import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import * as UserActions from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;
        const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

        yield call(api.put, 'users', profile);

        toast.success('Usuario atualizado com sucesso');
        yield put(UserActions.updateProfileSucess(profile));
    } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o usuario');
        yield put(UserActions.updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
