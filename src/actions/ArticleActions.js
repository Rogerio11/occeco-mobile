import axios from "axios";
import {servURL} from "../../servUrl";
import {authHeader} from "../utils";

export const getAllArticles = () => async dispatch => {
    try {
        const res = await axios.get(`${servURL}/article/getAll`, { headers: await authHeader() });
        console.log(res.data)
        dispatch({
            type: "GET_ALL_ARTICLES_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const createArticle = (newArticle) => async dispatch => {
    //console.log("TypeArticleActions - createTypeArticle = ", typeArticle);
    try {
        const res = await axios.post(`${servURL}/article/add`, newArticle, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "CREATE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const updateArticle = (article) => async dispatch => {
    //console.log("TypeArticleActions - updateTypeArticle = ", typeArticle);
    try {
        const res = await axios.post(`${servURL}/article/update`, article, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "UPDATE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const deleteArticle = (id) => async dispatch => {
    console.log("ArticleActions - deleteArticle = ", id);
    try {
        console.log(id)
        const res = await axios.delete(`${servURL}/article/delete`, {data: {id},  headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "DELETE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};