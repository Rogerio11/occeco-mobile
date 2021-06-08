import React from 'react';
import { useSelector } from "react-redux";
import { View } from 'react-native';
import { Button, Card, useTheme, Text } from 'react-native-elements';
import ProfileScreen from './Profile';
import ResetPasswordScreen from './ResetPassword';

function HomepageScreen({ navigation }) {

    const user = useSelector(state => state.User);
    const errorLogin = useSelector(state => state.User.errorLogin);
    const { theme } = useTheme();
    // var urlParams = new URLSearchParams(window.location.search); // To be redirected if forgoten password

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* { urlParams && <ResetPasswordScreen navigation={navigation} } */}
            {
                user.isLoggedIn
                    ? (<ProfileScreen navigation={navigation} />)
                    : (
                        <>
                            <Card containerStyle={{ width: '99%', backgroundColor: theme.colors.secondary }}>
                                <Card.Title>Vous avez déjà un compte ?</Card.Title>
                                <Card.Divider />
                                <Button
                                    title="Connexion"
                                    onPress={() => navigation.push('Connexion')}
                                />
                                {errorLogin && <Text style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    fontSize: 20,
                                    backgroundColor: 'lightgray'
                                }}> {errorLogin} </Text>}
                            </Card>
                            <Card containerStyle={{ width: '99%', backgroundColor: theme.colors.secondary }}>
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

        </View>
    );
}

export default HomepageScreen;