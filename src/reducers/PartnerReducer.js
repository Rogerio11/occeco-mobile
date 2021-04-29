const DefaultState = {
    accountSearched: null
}

const PartnerReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GETBYMAIL_SUCCESS":
            return {
                ...state,
                accountSearched: action.payload,
                errorGetByMail: null
            };
        case "GETBYMAIL_ERROR":
            console.log("erreur lors d'une recherche par mail");
            return {
                ...state,
                errorGetByMail: action.payload
            };
        case "CHANGETYPE_SUCCESS":
            return {
                ...state,
                accountSearched: action.payload.account,
                errorChangeType: null
            };
        case "CHANGETYPE_ERROR":
            console.log("erreur lors d'un changement de accountType");
            return {
                ...state,
                errorChangeType: action.payload

            };
        default:
            return state;
    }
}

export default PartnerReducer;