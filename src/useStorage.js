import AsyncStorage from '@react-native-async-storage/async-storage';

/* Hook for AsyncStorage */

export const storeData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch(e) {
        // read error
    }
}

export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch(e) {
        // read error
    }
}

export const deleteData = async (key) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch(e) {
        // read error
    }
}
