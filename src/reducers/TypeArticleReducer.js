const DefaultState = {
    typesArticle: []
}

const TypeArticleReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GET_ALL_TYPES_SUCCESS":
            return {
                ...state,
                typesArticle: action.payload
            };
        case "UPDATE_TYPE_ARTICLE_SUCCESS":
            return {
                ...state,
                typesArticle: state.typesArticle.map(t => {
                    if (t._id === action.payload._id){
                        t = action.payload
                    }
                    return t
                })
            };
        case "DELETE_TYPE_ARTICLE_SUCCESS":
            return {
                ...state,
                typesArticle: state.typesArticle.filter(t => t._id !== action.payload._id)
            };
        case "CREATE_TYPE_ARTICLE_SUCCESS":
            return {
                ...state,
                typesArticle: [...state.typesArticle, action.payload]
            };
        default:
            return state;
    }
}

export default TypeArticleReducer;