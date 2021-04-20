const DefaultState = {
    accountSearched: null
}

const PartnerReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GETBYMAIL_SUCCESS":
            return {
                ...state,
                accountSearched: action.payload
            };
        case "GETBYMAIL_ERROR":
            console.log("erreur lors d'une recherche par mail");
            return {
                ...state,
            };
        case "CHANGETYPE_SUCCESS":
            return {
                ...state,
                accountSearched: action.payload.account
            };
        case "CHANGETYPE_ERROR":
            console.log("erreur lors d'un changement de accountType");
            return {
                ...state
            };
        default:
            return state;
    }
}

export default PartnerReducer;