const DefaultState = {
    articles: [],
    currentArticle: null,
}

const ArticleReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "GET_ALL_ARTICLES_SUCCESS":
            return {
                ...state,
                articles: action.payload
            };
        case "CREATE_ARTICLE_SUCCESS":
            return { ...state, articles: [...state.articles, action.payload] };

        case "UPDATE_ARTICLE_SUCCESS":

            return { ...state, articles: state.articles.map(article => article._id === action.payload._id ? action.payload : article)}
    
        case "DELETE_ARTICLE_SUCCESS":
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.payload._id)
            };
        case "SET_CURRENT_ARTICLE":
                return { ...state, currentArticle: action.payload };
        default:
            return state;
    }
}

export default ArticleReducer;

