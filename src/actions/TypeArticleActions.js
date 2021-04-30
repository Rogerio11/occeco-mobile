import axios from "axios";
import { servURL } from "../../servUrl";
import {authHeader} from "../utils";

export const getAllTypes = () => async dispatch => {
    try {
        const res = await axios.get(`${servURL}/typeArticle/list`, { headers: await authHeader() });
        console.log(res.data)
        dispatch({
            type: "GET_ALL_TYPES_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const updateTypeArticle = (typeArticle) => async dispatch => {
    //console.log("TypeArticleActions - updateTypeArticle = ", typeArticle);
    try {
        const res = await axios.patch(`${servURL}/typeArticle/update`, typeArticle, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "UPDATE_TYPE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const deleteTypeArticle = (id) => async dispatch => {
    console.log("TypeArticleActions - deleteTypeArticle = ", id);
    try {
        console.log(id)
        const res = await axios.delete(`${servURL}/typeArticle/delete`, {data: {id},  headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "DELETE_TYPE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const createTypeArticle = (typeArticle) => async dispatch => {
    //console.log("TypeArticleActions - createTypeArticle = ", typeArticle);
    try {
        const res = await axios.post(`${servURL}/typeArticle/add`, typeArticle, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "CREATE_TYPE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};
