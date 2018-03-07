import * as actionTypes from './../actions/actionTypes';

export const error = payload => {
    return {
        type: actionTypes.NOTIFY,
        payload
    }
}
export const error_remove = () => {
    return {
        type: actionTypes.NOTIFY_REMOVE
    }
}