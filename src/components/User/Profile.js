import React from 'react';
import { View } from 'react-native';
import { useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {logout} from '../../actions/UserActions';
import Address from './Address';
import { Button, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ProfileScreen({ navigation }) {
    const user = useSelector(state => state.User);
    
    const dispatch = useDispatch();
    const trylogout = () => {
      dispatch(logout())
      navigation.navigate('Accueil')
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text h4><b>Mes informations</b></Text>
          <br /><br />
          <Text><Ionicons name="mail" size="large"/> {user.user.accountMail}</Text>
          <Text><Ionicons name="map" size="large"/>  {user.user && user.user.user && user.user.user.userLocalisation && 
          `${user.user.user.userLocalisation.localisationNumber} ${user.user.user.userLocalisation.localisationStreet} ${user.user.user.userLocalisation.localisationPostalCode} ${user.user.user.userLocalisation.localisationCity}`} </Text>
          <Text><Ionicons name="locate" size="large"/>  {user.user && user.user.user && user.user.user.userDistance} km</Text>
          <br />
          <Button title="Modifier" onPress={() => navigation.push('Update')}/>
          <br />
          <Button title="Deconnexion" onPress={trylogout}/>
          { /* <Address /> */ }
          
        </View>
      
      );
    }

export default ProfileScreen;