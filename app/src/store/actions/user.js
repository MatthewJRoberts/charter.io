import * as actionTypes from './actionTypes';
import axios from './../axios';
import Cookies from 'universal-cookie';

import {
    error
} from './misc';

const cookies = new Cookies();

export const user_input = payload => {
    return {
        type: actionTypes.USER_INPUT,
        payload
    }
}

export const user_signup = payload => {
    return dispatch => {
        if(payload.password !== payload.passwordConfirm) {
            dispatch(error({type: 'negative', value: `Error: Passwords do not match.`}));
        }
        axios.post('/user/', {...payload}).then(response => {
            dispatch(user_signin_send(response.data));
            dispatch(error({type: 'positive', value: `Welcome, ${response.data.user.username}!`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: Failed to register.`})));
    }
}

export const user_signin = payload => {
    return dispatch => {
        axios.post('/user/profile/login', {...payload}).then(response => {
            dispatch(user_signin_send(response.data));
            dispatch(error({type: 'positive', value: `Welcome, ${response.data.user.username}!`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: Failed to login.`})));
    }
}

export const user_autosignin = () => {
    let token = cookies.get('x-auth');
    let expire = cookies.get('expire');
    return dispatch => {
        if(token === null) {
            return dispatch(user_signout());
        }

        if(Math.round(Date.now() / 1000) > expire) {
            dispatch(error({type: 'negative', value: `Session Expired!`}));
            return dispatch(user_signout());
        }

        axios.post('/user/profile/token',null,{
            headers: {'x-auth': token}
        }).then(response => {
            dispatch(user_signin_send(response.data));
            dispatch(error({type: 'positive', value: `Welcome, ${response.data.user.username}!`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: ${e.message}.`})));
    }
}

export const user_signin_send = payload => {
    // Expire date stored in SECONDS
    cookies.set('x-auth', payload.token, { path: '/' });
    cookies.set('expire', Math.round(Date.now() / 1000) + 3600, { path: '/' });
    return {
        type: actionTypes.USER_SIGNIN,
        payload
    }
}

export const user_signout = payload => {
    return dispatch => {
        cookies.remove('x-auth');
        cookies.remove('expire');
        dispatch(error({type: 'positive', value: `You have Logged out.`}));
        dispatch(user_signout_send());
    }
    
}

export const user_signout_send = payload => {
    return {
        type: actionTypes.USER_SIGNOUT
    }
}

export const user_edit_input = payload => {
    return {
        type: actionTypes.USER_EDIT_INPUT,
        payload
    }
}

export const user_edit_set = payload => {
    return {
        type: actionTypes.USER_EDIT_SET
    }
}

export const user_edit_apply = payload => {
    let token = cookies.get('x-auth');
    return dispatch => {
        axios.put('/user/', payload, {
            headers: {'x-auth': token}
        }).then(response => {
            dispatch(user_edit_apply_send(response.data));
            dispatch(error({type: 'positive', value: `Information Updated.`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Failed to update information.`})));
    }
}

export const user_edit_apply_send = payload => {
    return {
        type: actionTypes.USER_EDIT_APPLY,
        payload
    }
}