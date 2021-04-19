import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector} from "react-redux";
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
          
            {
              /*
              <Text>Mail : {user.user.account.accountMail}</Text>
              
              <Text>Catégories choisies : TODO !</Text>
              <Text>Distance : {user.user.userDistance}</Text>
              <Text>Type user : {user.user.account.accountType}</Text>
              */
            }
            <Text>Mail : {user.user.user.userDistance}</Text>
              
          <Text>Vue Profil</Text>
          <Button title="Modifier" buttonStyle={{color:'green'}} onPress={() => navigation.push('Update')}/>
          <Button title="Deconnexion" onPress={trylogout}/>
          
        </View>
      
      );
    }

export default ProfileScreen;