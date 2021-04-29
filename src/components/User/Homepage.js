import React from 'react';
import { useSelector } from "react-redux";
import { View } from 'react-native';
import { Button, Card, useTheme, Text } from 'react-native-elements';
import ProfileScreen from './Profile';
import ResetPasswordScreen from './ResetPassword';

function HomepageScreen({ navigation }) {

    const user = useSelector(state => state.User);
    const { theme } = useTheme();
    var urlParams = new URLSearchParams(window.location.search);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card containerStyle={{ width: '99%', height: '99%' }}>
                {urlParams && urlParams.get('token')
                    ? <ResetPasswordScreen navigation={navigation} />
                    :
                    user.isLoggedIn
                        ? (<ProfileScreen navigation={navigation} />)
                        : (
                            <>
                                <Card containerStyle={{ width: '95%', backgroundColor: theme.colors.secondary }}>
                                    <Card.Title>Vous avez déjà un compte ?</Card.Title>
                                    <Card.Divider />
                                    <Button
                                        title="Connexion"
                                        onPress={() => navigation.push('Connexion')}
                                    />
                                </Card>
                                <Card containerStyle={{ width: '95%', backgroundColor: theme.colors.secondary }}>
                                    <Card.Title>Vous êtes nouveau ?</Card.Title>
                                    <Card.Divider />
                                    <Button
                                        title="Inscription"
                                        onPress={() => navigation.push('Inscription')}
                                    />
                                </Card>

                            </>
                        )
                }
            </Card>
        </View>
    );
}

export default HomepageScreen;