import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector} from "react-redux";

export const generatePassword = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const authHeader = async ()  => {
    try {
        console.log("utils - authHeader")
        
        const user = await getToken();
        //const user = localStorage.getItem('user');
        //const user = JSON.parse(tryGetuser);

        console.log("user : ", user)
        if (user && user.userToken) {
            return { 'authorization': `Bearer ${user.userToken }`};
        } else {
            return {};
    }
    
    }
    catch(e){
        return {}
    }
};

const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("user");
      let data = JSON.parse(userData);
      console.log("data and userData : ",data, userData);
      return data
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }