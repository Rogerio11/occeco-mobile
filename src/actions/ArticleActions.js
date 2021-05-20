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
    console.log("-------------Article dans Actions-------------")
        console.log(newArticle)
        console.log("--------------------------------------------")
    try {
        const res = await axios.post(`${servURL}/article/add`, newArticle, { headers: await authHeader() });
        
        console.log("-------------Article de retour-------------")
        console.log(res.data)
        console.log("--------------------------------------------")

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
        const res = await axios.patch(`${servURL}/article/update`, article, { headers: await authHeader() });
        
        

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

export const setCurrentArticle = (article) => async dispatch => {
    dispatch({
        type: "SET_CURRENT_ARTICLE",
        payload: article
    });
};