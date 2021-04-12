import React from 'react';
import { useSelector} from "react-redux";
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements'


function HomepageScreen({ navigation }) {

    const user = useSelector(state => state.User);

    return (
        
        <Card>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
        </Card>    
    );
}

export default HomepageScreen;