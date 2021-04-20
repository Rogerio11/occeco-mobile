import { getData } from './useStorage'

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

        const tryGetuser = await getData('user');
        const user = JSON.parse(tryGetuser);

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
