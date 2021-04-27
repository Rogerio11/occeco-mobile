import { getData } from '../useStorage'
const user = getData('user');

// C'est pas inversé ça ? #Timi
const DefaultState = 
    user ?
    {
        isLoggedIn : false,
        user: null
    }
    :
    {
        isLoggedIn: true,
        user
    }

const UserReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                userToken: action.payload.token,
                user: action.payload.account
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                isLoggedIn: false,
                userToken: null,
                user: null
            };
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                userToken: action.payload.token,
                user: action.payload.account
            };
        case "UPDATE_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: {...state.user, user: action.payload }
            };
        case "UPDATEMAIL_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                errorUpdateMail: null
            };
        case "UPDATEMAIL_FAILURE":
            return {
                ...state,
                isLoggedIn: true,
                errorUpdateMail: action.payload
            };
        case "UPDATEPASSWORD_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                errorUpdatePassword: null
            };
        case "UPDATEPASSWORD_FAILURE":
            return {
                ...state,
                isLoggedIn: true,
                errorUpdatePassword: action.payload
            };
        case "SENDRESETPASSWORDURL_SUCCESS":
            return {
                ...state,
                errorSendResetPasswordUrl: null
            };
        case "SENDRESETPASSWORDURL_ERROR":
            return {
                ...state,
                errorSendResetPasswordUrl: action.payload
            };
        default:
            return state;
    }
}

export default UserReducer;