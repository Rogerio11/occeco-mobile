import { getData } from './useStorage'

export const authHeader = async () => {
    try {

        const tryGetuser = await getData('user');
        const user = JSON.parse(tryGetuser);

        if (user && user.token) {
            return { 'authorization': `Bearer ${user.token}` };
        } else {
            return {};
        }

    }
    catch (e) {
        return {}
    }
};
