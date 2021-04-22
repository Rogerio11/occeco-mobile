import React from 'react';
import { View } from 'react-native';
import Address from './Address';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/UserActions';
import { Button, Text} from 'react-native-elements';


function ProfileScreen({ navigation }) {
  const user = useSelector(state => state.User);

  const dispatch = useDispatch();
  const trylogout = () => {
    dispatch(logout())
    navigation.navigate('Accueil')
  }
  return (
    <View style={{ flex: 1,  justifyContent: 'center' }}>
      <Text h3> Mon Compte</Text>
      <br />
      
      <Text> <Ionicons name="mail" size="large"/> {user.user.accountMail}</Text>
      <br />
      
      <Text>Catégories choisies : TODO !</Text>
      <br />
      <Text><Ionicons name="locate" size="large"/> {user.user.user && user.user.user.userDistance} km</Text>
      <br />
      <Text><Ionicons name="map" size="large"/>  {user.user && user.user.user && user.user.user.userLocalisation && 
          `${user.user.user.userLocalisation.localisationNumber} ${user.user.user.userLocalisation.localisationStreet} ${user.user.user.userLocalisation.localisationPostalCode} ${user.user.user.userLocalisation.localisationCity}`} </Text>
      <br />
      {user.user.accountType === "partner" &&
        <Text> Vous êtes <b>Partenaire</b></Text>}
      {user.user.accountType === "admin" &&
        <Text> Vous êtes <b>Administrateur</b></Text>}
      <br />

      <View style={{ flexDirection: "row" }}>
        <Button title="Modifier" onPress={() => navigation.push('UpdateAccount')} buttonStyle={{backgroundColor:'green'}}/>
        <Text> </Text>
        <Button title="Deconnexion" onPress={trylogout} buttonStyle={{backgroundColor:'green'}}/>
      </View>

    </View>

  );
}

export default ProfileScreen;