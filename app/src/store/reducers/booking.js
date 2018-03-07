import * as actionTypes from './../actions/actionTypes';

const initialState = {
    bookings: [],
    addbooking: {
        customer: {
            fullname: "",
            contact: {
                email: "",
                phone: ""
            }
        },
        date: {
            start: null,
            end: null
        }
    },
    selectedBooking: null
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.BOOKING_ALL:
            return {
                ...state,
                bookings: action.payload
            }
        case actionTypes.BOOKING_CHANGE:
            switch(action.payload.type) {
                case 'fullname':
                    return {
                        ...state,
                        addbooking: {
                            customer: {
                                fullname: action.payload.value,
                                contact: {
                                    email: state.addbooking.customer.contact.email,
                                    phone: state.addbooking.customer.contact.phone
                                }
                            },
                            date: {
                                start: state.addbooking.date.start,
                                end: state.addbooking.date.end
                            }
                        }
                    }
                case 'email':
                    return {
                        ...state,
                        addbooking: {
                            customer: {
                                fullname: state.addbooking.customer.fullname,
                                contact: {
                                    email: action.payload.value,
                                    phone: state.addbooking.customer.contact.phone
                                }
                            },
                            date: {
                                start: state.addbooking.date.start,
                                end: state.addbooking.date.end
                            }
                        }
                    }
                case 'phone':
                    return {
                        ...state,
                        addbooking: {
                            customer: {
                                fullname: state.addbooking.customer.fullname,
                                contact: {
                                    email: state.addbooking.customer.contact.email,
                                    phone: action.payload.value
                                }
                            },
                            date: {
                                start: state.addbooking.date.start,
                                end: state.addbooking.date.end
                            }
                        }
                    }
                case 'start':
                    return {
                        ...state,
                        addbooking: {
                            customer: {
                                fullname: state.addbooking.customer.fullname,
                                contact: {
                                    email: state.addbooking.customer.contact.email,
                                    phone: state.addbooking.customer.contact.phone
                                }
                            },
                            date: {
                                start: new Date(action.payload.value).getTime(),
                                end: state.addbooking.date.end
                            }
                        }
                    }
                case 'end':
                    return {
                        ...state,
                        addbooking: {
                            customer: {
                                fullname: state.addbooking.customer.fullname,
                                contact: {
                                    email: state.addbooking.customer.contact.email,
                                    phone: state.addbooking.customer.contact.phone
                                }
                            },
                            date: {
                                start: state.addbooking.date.start,
                                end: new Date(action.payload.value).getTime()
                            }
                        }
                    }
                default:
                    return {
                        ...state
                    }
            }
        case actionTypes.BOOKING_ADD:
            let _bookings = [...state.bookings];
            _bookings.push(action.payload);
            return {
                ...state,
                bookings: _bookings,
                addbooking: {
                    customer: {
                        fullname: "",
                        contact: {
                            email: "",
                            phone: ""
                        }
                    },
                    date: {
                        start: null,
                        end: null
                    }
                }
            }
        case actionTypes.BOOKING_DELETE:
            let _bookings2 = null;
            _bookings2 = [...state.bookings];
            _bookings2.splice(_bookings2.map(x => x._id).indexOf(action.payload._id), 1);
            return {
                ...state,
                bookings: _bookings2
            }
        case actionTypes.BOOKING_UPDATE:
            let _bookings3 = null;
            _bookings3 = [...state.bookings];
            _bookings3[_bookings3.map(x => x._id).indexOf(action.payload._id)] = action.payload;
            return {
                ...state,
                bookings: _bookings3
            }
        case actionTypes.BOOKING_SELECT:
            return {
                ...state,
                selectedBooking: action.payload.index
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;