import * as actionTypes from './../../store/actions/actionTypes';

const initialState = {
    bookings: [],
    selectedYear: 0,
    selectedMonth: 0,
    selectedDays: {
        start: 0,
        end: 0,
        toggle: false
    },
    customerInfo: {
        fullname: '',
        email: '',
        phone: '',
        message: ''
    },
    progress: 0,
    error: {
        msg: '',
        type: ''
    },
    info: {},
    infoLoaded: false
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.CALENDAR_INFO:
            return {
                ...state,
                bookings: action.payload.bookings,
                info: action.payload.info,
                infoLoaded: true
            }
        case actionTypes.CALENDAR_INPUT:
            switch(action.payload.type) {
                case 'fullname':
                    return {
                        ...state,
                        customerInfo: {
                            fullname: action.payload.value,
                            email: state.customerInfo.email,
                            phone: state.customerInfo.phone,
                            message: state.customerInfo.message
                        }
                    }
                case 'email':
                    return {
                        ...state,
                        customerInfo: {
                            fullname: state.customerInfo.fullname,
                            email: action.payload.value,
                            phone: state.customerInfo.phone,
                            message: state.customerInfo.message
                        }
                    }
                case 'phone':
                    return {
                        ...state,
                        customerInfo: {
                            fullname: state.customerInfo.fullname,
                            email: state.customerInfo.email,
                            phone: action.payload.value,
                            message: state.customerInfo.message
                        }
                    }
                case 'message':
                    return {
                        ...state,
                        customerInfo: {
                            fullname: state.customerInfo.fullname,
                            email: state.customerInfo.email,
                            phone: state.customerInfo.phone,
                            message: action.payload.value
                        }
                    }
                default:
                    return {
                        ...state
                    }
            }
        case actionTypes.CALENDAR_MOD:
            let sm = state.selectedMonth;
            let sy = state.selectedYear;
            if(action.payload.up) {
                if(sm === 11) {
                    sm = 0;
                    sy += 1;
                } else {
                    sm += 1;
                }
            } else {
                if(sm === 0) {
                    sm = 11
                    sy -= 1;
                } else {
                    sm -= 1;
                }
            }
            return {
                ...state,
                selectedMonth: sm,
                selectedYear: sy
            }
        case actionTypes.CALENDAR_SET:
            return {
                ...state,
                selectedMonth: new Date().getMonth(),
                selectedYear: new Date().getFullYear()
            }
        case actionTypes.CALENDAR_SELECT:
            return {
                ...state,
                selectedDays: action.payload.selectedDays
            }
        case actionTypes.CALENDAR_PROGRESS:
            let _progress = state.progress;
            if(action.payload.up) {
                _progress += 1;
            } else {
                if(_progress !== 0) {
                    _progress -= 1;
                }
            }
            return {
                ...state,
                progress: _progress
            }
        case actionTypes.CALENDAR_ERROR:
            return {
                ...state,
                error: {
                    type: action.payload.type,
                    msg: action.payload.msg
                }

            }
        case actionTypes.CALENDAR_POST:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;