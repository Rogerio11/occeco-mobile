const DefaultState = {
    isLoggedIn: false,
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
        case "UPDATED_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                userToken: action.payload.token,
                user: action.payload.account
            };
        case "GETALL_SUCCESS": //Timi, faudra me reexpliquer
            return {
                ...state,
                accounts: action.payload.accounts
            };
        case "GETBYMAIL_SUCCESS": //Timi, faudra me reexpliquer
            return {
                ...state,
                accountSearched: action.payload.account
            };
        case "CHANGETYPE_SUCCESS": //Timi, faudra me reexpliquer
            return {
                ...state,
                accountSearched: action.payload.account
            };
        case "CHANGETYPE_ERROR": //Timi, faudra me reexpliquer
            console.log("erreur lors d'un changement de accountType");
            return {
                ...state
            };
        default:
            return state;
    }
}

export default UserReducer;