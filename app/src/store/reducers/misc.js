import * as actionTypes from './../actions/actionTypes';

const intitialState = {
    error: {
        type: '',
        value: null
    },
    modal: {
        active: false,
        operation: null
    }
}

const reducer = ( state = intitialState, action ) => {
    switch(action.type) {
        case actionTypes.NOTIFY:
            return {
                ...state,
                error: {
                    type: action.payload.type,
                    value: action.payload.value
                }
            }
        case actionTypes.NOTIFY_REMOVE:
            return {
                ...state,
                error: {
                    type: null,
                    value: null
                }
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;