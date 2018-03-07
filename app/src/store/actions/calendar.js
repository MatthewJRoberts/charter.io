import * as actionTypes from './actionTypes';
import axios from './../axios';

export const calendar_info = payload => {
    return dispatch => {
        axios.get(`/user/${ payload.calendarid }`).then(response => {
            axios.get(`/booking/all/accepted/${ payload.calendarid }`).then(response2 => {
                dispatch(calendar_info_send({bookings: response2.data, info: response.data.info}));
            }).catch(e => dispatch(calendar_error({type: 'negative', msg: 'Failed To Fetch Calendar Information.'})));
        }).catch(e => dispatch(calendar_error({type: 'negative', msg: 'Failed To Fetch Calendar Information.'})));
    }
}
export const calendar_info_send = payload => {
    return {
        type: actionTypes.CALENDAR_INFO,
        payload
    }
}

export const calendar_mod = payload => {
    return {
        type: actionTypes.CALENDAR_MOD,
        payload
    }
}

export const calender_set = payload => {
    return {
        type: actionTypes.CALENDAR_SET
    }
}

export const calendar_select = payload => {
    // Selection Validation
    for(let i = 0; i < payload.bookings.length; i++) {
        if(
            (payload.value <= payload.bookings[i].date.end) && 
            (payload.value >= payload.bookings[i].date.start - 3600000)
        ) {
            return {
                type: actionTypes.CALENDAR_SELECT,
                payload: {
                    selectedDays: {
                        start: 0,
                        end: 0,
                        toggle: false
                    }
                }
            }
        }
    }
    if(!payload.selectedDays.toggle) {
        return {
            type: actionTypes.CALENDAR_SELECT,
            payload: {
                selectedDays: {
                    start: payload.value,
                    end: 0,
                    toggle: !payload.selectedDays.toggle
                }
            }
        }
    } else {
        if(payload.value >= payload.selectedDays.start) {

            // Stop Booking Overlap
            for(let i = 0; i < payload.bookings.length; i++) {
                if(
                    (payload.selectedDays.start <= payload.bookings[i].date.start) && 
                    (payload.value >= payload.bookings[i].date.end)
                ) {
                    return {
                        type: actionTypes.CALENDAR_SELECT,
                        payload: {
                            selectedDays: {
                                start: 0,
                                end: 0,
                                toggle: false
                            }
                        }
                    }
                }
            }

            return {
                type: actionTypes.CALENDAR_SELECT,
                payload: {
                    selectedDays: {
                        start: payload.selectedDays.start,
                        end: payload.value,
                        toggle: !payload.selectedDays.toggle
                    }
                }
            }
        } else {
            return {
                type: actionTypes.CALENDAR_SELECT,
                payload: {
                    selectedDays: {
                        start: 0,
                        end: 0,
                        toggle: false
                    }
                }
            }
        }
    }
}

export const calendar_progress = payload => {
    return dispatch => {
        if((payload.customerInfo.fullname === "") || (payload.customerInfo.email === "")) {
            return dispatch(calendar_error({type: 'negative', msg: 'A Fullname and Email Address is Required.'}))
        } else {
            if(payload.customerInfo.fullname.length < 4) {
                return dispatch(calendar_error({type: 'negative', msg: 'Fullname must be at least 4 characters.'}));
            }
            let email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]/;
            if(!email.test(payload.customerInfo.email)) {
                return dispatch(calendar_error({type: 'negative', msg: 'Invalid Email Address.'}));
            }
            dispatch({
                type: actionTypes.CALENDAR_PROGRESS,
                payload
            });
        }
    }
}

export const calendar_error = payload => {
    return {
        type: actionTypes.CALENDAR_ERROR,
        payload
    }
}

export const calendar_input = payload => {
    return {
        type: actionTypes.CALENDAR_INPUT,
        payload
    }
}

export const calendar_post = payload => {
    return dispatch => {
        if(payload.selectedDays.end <= new Date().getTime()) {
            dispatch(calendar_error({type: 'negative', msg: 'Failed to create booking.'}));
            return;
        }
        let data = {
            customer: {
                fullname: payload.customerInfo.fullname,
                message: payload.customerInfo.message,
                contact: {
                    email: payload.customerInfo.email,
                    phone: payload.customerInfo.phone
                }
            },
            date: {
                start: payload.selectedDays.start,
                end: payload.selectedDays.end
            },
            userid: payload.calendarid
        }
        axios.post('/booking/', data).then(response => {
            dispatch(calendar_post_send(response.data));
            dispatch(calendar_progress({up: true, customerInfo: payload.customerInfo}));
        }).catch(e => dispatch(calendar_error({type: 'negative', msg: 'Failed to create booking.'})));
    }
}

export const calendar_post_send = payload => {
    return {
        type: actionTypes.CALENDAR_POST,
        payload
    }
}