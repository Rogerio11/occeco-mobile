import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from '../../actions/UserActions';
import { Button, Text, Divider, Card, Input } from 'react-native-elements';
import { wrongInputsAlert, customAlert } from "../Utils/Alerts";

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

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Card containerStyle={{ width: '99%', height: '99%' }}>
                {urlParams && urlParams.get('token') && !user.isLoggedIn
                    ? <>
                        <Card.Title> Réinitialiser votre mot de passe ?</Card.Title>
                        <Text h4> {urlParams.get('token')}</Text>
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
                    : <>
                        <Card.Title> Vous ne devriez pas être ici </Card.Title>
                        <Text> Vous avez demandé une réinitialisation du mot de passe alors que vous êtes connecté.
                        Si vous pensez que c'est une erreur, essayez de changer de navigateur.
                        </Text>
                    </>
                }
            </Card>
        </View>

    );
}

export default ResetPasswordScreen;