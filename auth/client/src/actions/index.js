import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);     // Persist token that we check when app boots up (src/index.js) so authenticated user is not forgotten in web page refresh.
        callback(); // This callback is defined in auth\client\src\components\auth\Signup.js and redirects authenticated user to Feature page.
    }
    catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'An account already exists with that email address.' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);     // Persist token that we check when app boots up (src/index.js) so authenticated user is not forgotten in web page refresh.
        callback(); // This callback is defined in auth\client\src\components\auth\Signup.js and redirects authenticated user to Feature page.
    }
    catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'The email address and/or password are not valid.' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};