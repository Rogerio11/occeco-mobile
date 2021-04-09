import axios from "axios";
import servURL from "../servUrl";
import {authHeader} from "../utils";

export const login = (user) => async dispatch => {
    console.log("loginactions = ",user);
    try {

        const res = await axios.post(`${servURL}/login`, user, {headers: authHeader()});
        console.log(res.data)
        if(res.data.authToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

export const logout = () => async dispatch => {
    try{
        localStorage.removeItem("user");

        dispatch({
            type: "LOGOUT_SUCCESS",
        });

    } catch (e) {
        console.log(e);
    }
};

export const signup = (user) => async dispatch => {
    try {

        const res = await axios.post(`${servURL}/signupPublic`, user, {headers: authHeader()});
        console.log(res.data)
        if(res.data.authToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch({
            type: "SIGNUP_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

