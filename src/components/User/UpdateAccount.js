import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { updateAccountMail, updateAccountPassword } from "../../actions/UserActions";
import { Card, Input, Button, Text } from 'react-native-elements'
import { wrongInputsAlert } from "../Utils/Alerts";

function UpdateAccountScreen({ navigation }) {
    const user = useSelector(state => state.User.user);
    const errorUpdateMail = useSelector(state => state.User.errorUpdateMail);
    const errorUpdatePassword = useSelector(state => state.User.errorUpdatePassword);
    const dispatch = useDispatch();
    const [newAccountMail, setNewAccountMail] = React.useState("");
    const [newAccountPassword, setNewAccountPassword] = React.useState("");
    const [oldAccountPassword, setOldAccountPassword] = React.useState("");

    const changeEmail = () => {
        if (!newAccountMail) {
            wrongInputsAlert()
        } else {
            dispatch(updateAccountMail(newAccountMail));
        }
    };

    const changePassword = () => {
        if (!oldAccountPassword || !newAccountPassword) {
            wrongInputsAlert()
        } else {
            dispatch(updateAccountPassword(oldAccountPassword, newAccountPassword))
        }
    };

    const styles = StyleSheet.create({
        errorText: {
            fontWeight: 'bold',
            color: 'red',
            fontSize: 20,
            backgroundColor: 'lightgray'
        },
    });

    return (
        <Card>
            <View>
                <Card.Title> Modifier votre compte</Card.Title>
                <Text h4> Votre adresse email est actuellement : <b>{user.accountMail}</b> </Text>
                <Input
                    placeholder="change mail ?"
                    leftIcon={{ type: 'feather', name: 'mail' }}
                    value={newAccountMail}
                    onChangeText={setNewAccountMail}
                />
                <Button title="Modifier" onPress={changeEmail} />
                {errorUpdateMail && <Text style={styles.errorText}> {errorUpdateMail} </Text>}
                <br />
                <Text h4> Changer de mot de passe ? </Text>
                <Input
                    placeholder="ancien"
                    label="ancien mot de passe"
                    leftIcon={{ type: 'antdesign', name: 'lock' }}
                    value={oldAccountPassword}
                    onChangeText={setOldAccountPassword}
                    secureTextEntry={true}
                />
                <Input
                    placeholder="nouveau"
                    label="nouveau mot de passe"
                    leftIcon={{ type: 'antdesign', name: 'unlock' }}
                    value={newAccountPassword}
                    onChangeText={setNewAccountPassword}
                    secureTextEntry={true}
                />
                <Button title="Changer de mot de passe" onPress={changePassword} />
                {errorUpdatePassword && <Text style={styles.errorText}> {errorUpdatePassword} </Text>}
            </View>
        </Card>
    );
}

export default UpdateAccountScreen;