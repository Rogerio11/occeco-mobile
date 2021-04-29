import { showMessage, hideMessage } from "react-native-flash-message";


export const wrongInputsAlert = () => {
    showMessage({
        message: "Champs invalides",
        type: "danger",
    });
}

export const customLongSuccessAlert = (message) => {
    showMessage({
        message: message,
        type: "success",
        autoHide: false,
    });
}

export const customErrorAlert = (message) => {
    showMessage({
        message: message,
        type: "danger",
    });
}