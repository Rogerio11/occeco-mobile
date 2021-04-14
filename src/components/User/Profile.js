import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector} from "react-redux";
import { Card } from 'react-native-elements';
import {useDispatch} from "react-redux";
import {logout} from '../../actions/UserActions';

function ProfileScreen({ navigation }) {
    const user = useSelector(state => state.User);
    console.log(user)
    const dispatch = useDispatch();
    const trylogout = () => {
      dispatch(logout())
      navigation.navigate('Accueil')
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Card>
            {
              /*
              <Text>Mail : {user.user.account.accountMail}</Text>
              <Card.Divider />
              <Text>Catégories choisies : TODO !</Text>
              <Text>Distance : {user.user.userDistance}</Text>
              <Text>Type user : {user.user.account.accountType}</Text>
              */
            }
          <Text>Vue Profil</Text>
          <Card.Divider />
          <Button title="Modifier"/>
          <Card.Divider />
          <Button title="Deconnexion" onPress={trylogout}/>
          </Card>
        </View>
      
      );
    }

export default ProfileScreen;