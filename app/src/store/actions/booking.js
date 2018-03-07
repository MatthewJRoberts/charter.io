import * as actionTypes from './actionTypes';
import axios from './../axios';

import {
    error
} from './misc';

export const booking_all = payload => {
    return dispatch => {
        axios.get(`/booking/all/${ payload.userid }`).then(response => {
            dispatch(booking_all_send(response.data));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: ${e.message}.`})));
    }
}

export const booking_all_send = payload => {
    return {
        type: actionTypes.BOOKING_ALL,
        payload
    }
}

export const booking_change = payload => {
    return {
        type: actionTypes.BOOKING_CHANGE,
        payload
    }
}

export const booking_add = payload => {
    let body = {
        ...payload.data,
        userid: payload.userid,
        accepted: true
    };
    return dispatch => {
        axios.post('/booking', body).then(response => {
            dispatch(booking_add_send(response.data));
            dispatch(error({type: 'positive', value: `Booking Added.`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: ${e.message}.`})));
    }
}

export const booking_add_send = payload => {
    return {
        type: actionTypes.BOOKING_ADD,
        payload
    }
}

export const booking_delete = payload => {
    return dispatch => {
        axios.delete(`/booking/${payload.id}`, 
            {headers: {'x-auth': payload.token}}
        ).then(response => {
            dispatch(booking_delete_send(response.data));
            dispatch(error({type: 'positive', value: `Booking Removed.`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: ${e.message}.`})));
    }
}
export const booking_delete_send = payload => {
    return {
        type: actionTypes.BOOKING_DELETE,
        payload
    }
}

export const booking_update = payload => {
    return dispatch => {
        axios.put(`/booking/${payload.id}`, payload.data, 
            {headers: {'x-auth': payload.token}}
        ).then(response => {
            dispatch(booking_update_send(response.data));
            dispatch(error({type: 'positive', value: `Booking Updated.`}));
        }).catch(e => dispatch(error({type: 'negative', value: `Error: ${e.message}.`})));
    }
}
export const booking_update_send = payload => {
    return {
        type: actionTypes.BOOKING_UPDATE,
        payload
    }
}

export const booking_select = payload => {
    return {
        type: actionTypes.BOOKING_SELECT,
        payload
    }
}