import axios from "axios";
import servURL from "../../servUrl";
import { authHeader } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (account) => async dispatch => {
    console.log("UserActions - login = ", account);
    try {
        const res = await axios.post(`${servURL}/login`, account, { headers: authHeader() });
        console.log(res.data)

        if (res.data.authToken) {
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
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
        const res = await axios.put(`${servURL}/updateUser`, user, { headers: authHeader() });
        console.log(res.data)

        if (res.data.authToken) {
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch({
            type: "UPDATE_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const logout = () => async dispatch => {
    try {
        await AsyncStorage.removeItem("user");

        dispatch({
            type: "LOGOUT_SUCCESS",
        });

    } catch (e) {
        console.log(e);
    }
};

export const signup = (user) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/signupPublic`, user, { headers: authHeader() });
        if (res.data.authToken) {
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch({
            type: "SIGNUP_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const getAllAccounts = () => async dispatch => {
    try {
        const res = await axios.get(`${servURL}/account/getAll`, { headers: authHeader() });
        console.log("UserActions - getAllAcounts - res : ", res.data, "\n\n")

        dispatch({
            type: "GETALL_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const searchAccountByMail = (accountMail) => async dispatch => {
    try {
        const res = await axios.post(`${servURL}/account/getByMail`, { accountMail }, { headers: authHeader() });
        console.log("UserActions - searchAccountByMail - res : ", res.data, "\n\n")

        dispatch({
            type: "GETBYMAIL_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const modifyAccountType = (_id, accountType) => async dispatch => {
    try {
        console.log("UserActions - updateType : ", _id, accountType)
        const res = await axios.patch(`${servURL}/account/updateType`, { "accountId": _id, accountType }, { headers: authHeader() });
        if (res.data) {
            console.log("UserActions - updateType - res : ", res.data, "\n\n")
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
