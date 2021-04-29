import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, resetResponseUpdatePassword } from '../../actions/UserActions';
import { Button, Text, Divider, Card, Input } from 'react-native-elements';
import { wrongInputsAlert } from "../Utils/Alerts";
import { openURL, createURL } from 'expo-linking';

function ResetPasswordScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    var urlParams = new URLSearchParams(window.location.search);
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const responseUpdatePassword = useSelector(state => state.User.responseUpdatePassword);

    const changePassword = () => {
        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            wrongInputsAlert()
        } else {
            dispatch(resetPassword(urlParams.get('token'), newPassword))
        }
    };

    React.useEffect(() => {
        dispatch(resetResponseUpdatePassword());
        return () => dispatch(resetResponseUpdatePassword())
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Card containerStyle={{ width: '99%', height: '99%' }}>
                {urlParams && urlParams.get('token') && !user.isLoggedIn
                    ?
                    <>
                        <Card.Title> Réinitialiser votre mot de passe ?</Card.Title>
                        {(!responseUpdatePassword || responseUpdatePassword !== "success") &&
                            <>
                                <Input
                                    placeholder="nouveau mot de passe"
                                    label="Veuillez choisir un nouveau mot de passe"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={true}
                                />
                                <Input
                                    placeholder="confirmez le mot de passe"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={true}
                                />
                                <Button title="Changer de mot de passe" onPress={changePassword} />
                            </>
                        }
                        {responseUpdatePassword === "success" &&
                            <>
                                <Text> Votre mot de passe a bien été modifié. Vous pouvez maintenant vous connecter </Text>
                                <Button title="Se connecter" onPress={() => openURL(createURL(""))} />
                            </>
                        }
                    </>
                    : <>
                        <Card.Title> Vous ne devriez pas être ici </Card.Title>
                        <Text> Vous avez manifestement demandé une réinitialisation de votre mot de passe alors que vous êtes connecté.</Text>
                        <Divider />
                        <Button title="Revenir à l'application" onPress={() => openURL(createURL(""))} />
                    </>
                }
            </Card>
        </View>

    );
}

export default ResetPasswordScreen;