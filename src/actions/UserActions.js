import axios from "axios";
import servURL from "../../servUrl";
import {authHeader} from "../utils";
import { storeData, deleteData } from '../useStorage'

export const login = (account) => async dispatch => {
    console.log("UserActions - login = ", account);
    try {
        const res = await axios.post(`${servURL}/login`, account);
        console.log(res.data)
        
        if(res.data.token) {
            await storeData("user", JSON.stringify({token : res.data.token, ...res.data.account}));
        }

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const updateUser = (user) => async dispatch => {
    console.log("UserActions - updateUser = ", user);
    try {
        const res = await axios.patch(`${servURL}/updateUser`, user, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "UPDATE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const logout = () => async dispatch => {
    try{
        await deleteData("user");

        dispatch({
            type: "LOGOUT_SUCCESS",
        });

    } catch (e) {
        console.log(e);
    }
};

export const signup = (user) => async dispatch => {
    try {
        console.log();
        const res = await axios.post(`${servURL}/signupPublic`, user, {headers: await authHeader()});
        
        if(res.data) {
            await storeData("user", JSON.stringify({token : res.data.token, ...res.data.account}));

        }

        dispatch({
            type: "SIGNUP_SUCCESS",
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

/**
 * 
 * @param {mongoose.ObjectId} _id 
 * @param {String} accountType client or partner
 * @returns Modified account
 */
export const modifyAccountType = (_id, accountType) => async dispatch => {
    try {
        if (accountType != "client" && accountType != "partner") {
            return("error : not valid type")    
        }
        const res = await axios.patch(`${servURL}/account/updateType`, { "accountId": _id, accountType }, { headers: await authHeader() });
        if (res.data) {
            console.log("UserActions - modifyAccountType - res : ", res.data, "\n\n")
            dispatch({
                type: "CHANGETYPE_SUCCESS",
                payload: res.data
            });
        } else {
            dispatch({
                type: "CHANGETYPE_ERROR",
                payload: res.data
            });
        }

    } catch (err) {
        console.log(err);
    }
};


/*
export const getAllAccounts = () => async dispatch => {
    try {
        const res = await axios.get(`${servURL}/account/getAll`, { headers: authHeader() });
        console.log("UserActions - getAllAcounts - res : ", res.data, "\n\n")

        dispatch({
            type: "TODO",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};
*/
