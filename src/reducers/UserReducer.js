const DefaultState = {
    isLoggedIn : false,
    user: null
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
                userToken: action.payload.token,
                user: action.payload.account
            };
        default:
            return state;
    }
}

export default UserReducer;