import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateAccountMail, updateAccountPassword } from "../../actions/UserActions";
import { Card, Input, Button, Icon, Text, useTheme } from 'react-native-elements'

function UpdateAccountScreen({ navigation }) {
    const user = useSelector(state => state.User.user);
    const dispatch = useDispatch();
    const [newAccountMail, setNewAccountMail] = React.useState("");
    const [newAccountPassword, setNewAccountPassword] = React.useState("");
    const [oldAccountPassword, setOldAccountPassword] = React.useState("");
    
    const changeEmail = () => {
        dispatch(updateAccountMail(newAccountMail));
    };

    const changePassword = () => {
        dispatch(updateAccountPassword(oldAccountPassword, newAccountPassword))
    }


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
                <br/>
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
            </View>
        </Card>
    );
}

export default UpdateAccountScreen;