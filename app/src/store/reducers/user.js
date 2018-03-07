import * as actionTypes from './../actions/actionTypes';

const initialState = {
    userInput: {
        username: '',
        password: '',
        passwordConfirm: ''
    },
    user: {},
    auth: {
        token: null,
        userid: null
    },
    editUser: {
        email: ''
    }
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case actionTypes.USER_SIGNIN:
            return {
                ...state,
                user: action.payload.user,
                auth: {
                    token: action.payload.token,
                    userid: action.payload.user._id
                },
                userInput: {
                    username: '',
                    password: ''
                },
                editUser: {
                    email: ''
                }
            }
        case actionTypes.USER_INPUT:
            switch(action.payload.input) {
                case 'username':
                    return {
                        ...state,
                        userInput: {
                            username: action.payload.value,
                            password: state.userInput.password,
                            passwordConfirm: state.userInput.passwordConfirm
                        }
                    }
                case 'password':
                    return {
                        ...state,
                        userInput: {
                            username: state.userInput.username,
                            password: action.payload.value,
                            passwordConfirm: state.userInput.passwordConfirm
                        }
                    }
                case 'passwordConfirm':
                    return {
                        ...state,
                        userInput: {
                            username: state.userInput.username,
                            password: state.userInput.password,
                            passwordConfirm: action.payload.value
                        }
                    }
                default: 
                    return {
                        ...state
                    }
                }
        case actionTypes.USER_SIGNOUT:
            return {
                ...state,
                user: {},
                auth: {
                    token: null,
                    userid: null
                }
            }
        case actionTypes.USER_EDIT_INPUT:
            switch(action.payload.type) {
                case 'email':
                    return {
                        ...state,
                        editUser: {
                            email: action.payload.value
                        }
                    }
                default: 
                    return {
                        ...state
                    }
            }
        case actionTypes.USER_EDIT_SET:
            return {
                ...state,
                editUser: {
                    email: state.user.info.email
                }
            }
        case actionTypes.USER_EDIT_APPLY:
            return {
                ...state,
                user: action.payload
            }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;