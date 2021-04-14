import AsyncStorage from '@react-native-async-storage/async-storage';

export const generatePassword = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const authHeader = async () => {
    try {
        const tryGetuser = await AsyncStorage.getItem('user');
        const user = JSON.parse(tryGetuser);

        if (user && user.authToken) {
            return { 'auth-token': user.authToken };
        } else {
            return {};
    }
    
    }
    catch(e){
        return {}
    }
};