import axios from "axios";
import servURL from "../../servUrl";
import {authHeader} from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (account) => async dispatch => {
    console.log("loginactions = ",account);
    try {
        const res = await axios.post(`${servURL}/login`, account, {headers: authHeader()});
        console.log(res.data)
        
        if(res.data.authToken) {
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
    console.log("Upadateactions = ",user);
    try {
        const res = await axios.put(`${servURL}/updateUser`, user, {headers: authHeader()});
        console.log(res.data)
        
        if(res.data.authToken) {
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
    try{
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

        const res = await axios.post(`${servURL}/signupPublic`, user, {headers: authHeader()});
        
        if(res.data.authToken) {
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

export const updateUser = (user) => async dispatch => {
    try {
        
        const res = await axios.put(`${servURL}/updateUser`, user, {headers: authHeader()});
        
        if(res.data.authToken) {
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
        }
        

        dispatch({
            type: "UPDATED_SUCCESS",
            payload: res.data
        });

    } catch (err) {
        console.log(err);
    }
};

