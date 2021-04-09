import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { View, Button, Text } from 'react-native';
import {getUserById} from "../../actions/UserActions";

function HomepageScreen({ navigation }) {

    const user = useSelector(state => state.User);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Homepage Screen</Text>
            {
                user.isLoggedIn 
                ? (
                    <Button title="Profil" onPress={() => navigation.navigate('Profile')} />
                )
                : (
                    <>
                    <Button
                        title="Connexion"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <Button
                        title="Inscription"
                        onPress={() => navigation.navigate('SignUp')}
                    />
                    </>
                )
            }
            
        </View>
      );
}

export default HomepageScreen;