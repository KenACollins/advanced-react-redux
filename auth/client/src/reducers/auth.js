import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',  // Will hold token string of authenticated user.
    errorMessage: ''    // Don't name it error as this is a reserved keyword.
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;

    }
};