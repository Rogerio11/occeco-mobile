import axios from "axios";
import servURL from "../../servUrl";
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

export const updateTypeArticle = (nameType) => async dispatch => {
    //console.log("UserActions - updateUser = ", user);
    try {
        const res = await axios.patch(`${servURL}/typeArticle/update`, nameType, { headers: await authHeader() });
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
    //console.log("UserActions - updateUser = ", user);
    try {
        const res = await axios.delete(`${servURL}/typeArticle/delete`, id, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "DELETE_TYPE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const createTypeArticle = (nameType) => async dispatch => {
    //console.log("UserActions - updateUser = ", user);
    try {
        const res = await axios.post(`${servURL}/typeArticle/add`, nameType, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "CREATE_TYPE_ARTICLE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

/**
 * 
 * @param {String} accountMail 
 * @returns The account if it exists
 */
export const searchAccountByMail = (accountMail) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/account/getByMail`, { accountMail }, { headers: await authHeader() });

        if (res.data) {
            console.log("UserActions - searchAccountByMail - res : ", res.data, "\n\n")
            dispatch({
                type: "GETBYMAIL_SUCCESS",
                payload: res.data
            });
        } else {
            dispatch({
                type: "GETBYMAIL_ERROR",
                payload: res.data
            });
        }

    } catch (err) {
        console.log(err);
    }
};