
import { getData } from '../useStorage'
const user = getData('user');

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
    console.log(state)
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
        case "UPDATED_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: {...action.payload}
            };
        default:
            return state;
    }
}

export default UserReducer;