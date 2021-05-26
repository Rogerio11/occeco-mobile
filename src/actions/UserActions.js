import axios from "axios";
import { servURL } from "../../servUrl";
import { authHeader } from "../utils";
import { storeData, deleteData } from '../useStorage'
import * as Linking from "expo-linking";

export const login = (account) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/login`, account);

        if (res.data.token) {
            await storeData("user", JSON.stringify({ token: res.data.token, ...res.data.account }));
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
        const res = await axios.patch(`${servURL}/user/updateUser`, user, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "UPDATE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const getUser = (_id) => async dispatch => {
    console.log("reload user = ", _id);
    try {
        const res = await axios.post(`${servURL}/user/getUser`, {_id}, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "GET_USER_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const logout = () => async dispatch => {
    try {
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
        const res = await axios.post(`${servURL}/signupPublic`, user, { headers: await authHeader() });

        if (res.data) {
            await storeData("user", JSON.stringify({ token: res.data.token, ...res.data.account }));

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
        console.log("UserActions - searchAccountByMail - res : ", res.data, "\n\n")
        dispatch({
            type: "GETBYMAIL_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "GETBYMAIL_ERROR",
            payload: err.response.data.error
        });
    }
};

/**
 * Send an email with a secured token if the account exists
 * @param {String} accountMail
 */
export const sendResetPasswordUrl = (accountMail) => async dispatch => {
    try {
        const url = Linking.createURL("");
        const res = await axios.post(`${servURL}/forgotPassword`, { accountMail, basicUrl: url });
        dispatch({
            type: "SENDRESETPASSWORDURL_SUCCESS",
        });
    } catch (err) {
        dispatch({
            type: "SENDRESETPASSWORDURL_ERROR",
            payload: err.response.data.error
        });
    }
};

export const resetResponseUpdatePassword = () => async dispatch => {
    dispatch({
        type: "RESETPASSWORD_RESETSTATE",
        payload: ""
    });
}

/**
 * 
 * @param {String} token 
 * @param {String} accountPassword 
 */
export const resetPassword = (token, accountPassword) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/resetPassword`, { token, accountPassword });
        console.log("UserActions - sendResetPasswordUrl - res : ", res.data, "\n\n")
        dispatch({
            type: "RESETPASSWORD_SUCCESS",
            payload: res.data.response
        });
    } catch (err) {
        dispatch({
            type: "RESETPASSWORD_ERROR",
            payload: err.response.data.error
        });
    }
}

/**
 * 
 * @param {mongoose.ObjectId} _id 
 * @param {String} accountType client or partner
 * @returns Modified account
 */
export const modifyAccountType = (_id, accountType) => async dispatch => {
    try {
        if (accountType != "client" && accountType != "partner") {
            return ("error : not valid type")
        }
        const res = await axios.patch(`${servURL}/account/updateType`, { accountId: _id, accountType }, { headers: await authHeader() });
        console.log("UserActions - modifyAccountType - res : ", res.data, "\n\n")
        dispatch({
            type: "CHANGETYPE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "CHANGETYPE_ERROR",
            payload: err.response.data.error
        });
    }
};

/**
 * 
 * @param {String} newAccountMail 
 * @returns 
 */
export const updateAccountMail = (newAccountMail) => async dispatch => {
    console.log("UserActions - updateAccountMail = ", newAccountMail);
    try {
        const res = await axios.patch(`${servURL}/account/updateMail`, { newAccountMail }, { headers: await authHeader() });
        dispatch({
            type: "UPDATEMAIL_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "UPDATEMAIL_FAILURE",
            payload: err.response.data.error
        });
    }
};


export const updateAccountPassword = (oldAccountPassword, newAccountPassword) => async dispatch => {
    try {
        const res = await axios.patch(`${servURL}/account/updatePassword`, { oldAccountPassword, newAccountPassword }, { headers: await authHeader() });
        console.log(res.data)

        dispatch({
            type: "UPDATEPASSWORD_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "UPDATEPASSWORD_FAILURE",
            payload: err.response.data.error
        });
    }
};


export const addPushToken = (_id, userPushToken) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/user/addPushToken`, { _id, userPushToken }, { headers: await authHeader() });

        dispatch({
            type: "ADDPUSHTOKEN_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: "ADDPUSHTOKEN_FAILURE",
            payload: err.response.data.error
        });
    }
};

export const sendDailyNotifications = () => async dispatch => {
    try {
        const res = await axios.get(`${servURL}/sendDailyNotifications`, { headers: await authHeader() });
        dispatch({
            type: "SENDDAILYNOTIFICATIONS_SUCCESS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "SENDDAILYNOTIFICATIONS_FAILURE",
            payload: err.response.data.error
        });
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
