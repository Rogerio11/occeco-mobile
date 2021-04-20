import React from 'react';
import { useSelector} from "react-redux";
import { View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import ProfileScreen from './Profile';

function HomepageScreen({ navigation }) {

    const user = useSelector(state => state.User);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card containerStyle={{width: '99%', height: '99%'}}>

            {
                user.isLoggedIn 
                ? (<ProfileScreen navigation={navigation}/>)
                : (
                    <>
                    <Card containerStyle={{width: '95%', backgroundColor:'#DAF7A6'}}>
                        <Card.Title>Vous avez déjà un compte ?</Card.Title>
                        <Card.Divider/>
                        <Button
                            title="Connexion"
                            onPress={() => navigation.push('Connexion')}
                            buttonStyle={{backgroundColor:'green'}}
                        />
                    </Card>
                    <Card containerStyle={{width: '95%', backgroundColor:'#DAF7A6'}}>
                        <Card.Title>Vous êtes nouveau ?</Card.Title>
                        <Card.Divider/>
                        <Button
                            title="Inscription"
                            onPress={() => navigation.push('Inscription')}
                            buttonStyle={{backgroundColor:'green'}}
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