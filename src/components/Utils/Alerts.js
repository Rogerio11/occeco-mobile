import { showMessage, hideMessage } from "react-native-flash-message";


export const wrongInputsAlert = () => {
    showMessage({
        message: "Champs invalides",
        type: "danger",
    });
}
