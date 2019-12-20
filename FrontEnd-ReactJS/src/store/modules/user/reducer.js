import produce from 'immer';

const INITIAL_STATE = {
    profile: null,
};

export default function user(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/UPDATE_PROFILE_SUCESS': {
                draft.profile = action.payload.profile;
                break;
            }
            default:
        }
    });
}
