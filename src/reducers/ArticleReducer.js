const DefaultState = {
    articles: []
}

const ArticleReducer = (state = DefaultState, action) => {

    switch (action.type) {
        case "GET_ALL_ARTICLES_SUCCESS":
            return {
                ...state,
                articles: action.payload
            };
        case "CREATE_ARTICLE_SUCCESS":
            return {
                ...state,
                articles: state.articles.push(action.payload)
            };
        case "UPDATE_ARTICLE_SUCCESS":
            return {
                ...state,
                articles: state.articles.map(article => {
                    if (article._id === action.payload._id){
                        article = action.payload
                    }
                    return article
                })
            };
        case "DELETE_ARTICLE_SUCCESS":
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export default ArticleReducer;

