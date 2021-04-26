import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/UserActions';
import { Button, Text, Divider} from 'react-native-elements';
import MapView from './MapView';

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
      <Divider />
      
      <Text> <Ionicons name="mail" size="large"/> {user.user.accountMail}</Text>
      <Divider />
      
      <Text>Catégories choisies : TODO !</Text>
      <Divider />
      <Text><Ionicons name="locate" size="large"/> {user.user.user && user.user.user.userDistance} km</Text>
      <Divider />
      <Text><Ionicons name="map" size="large"/>  
      { /* user.user && user.user.user && user.user.user.userLocalisation && 
          `${user.user.user.userLocalisation.localisationNumber} ${user.user.user.userLocalisation.localisationStreet} ${user.user.user.userLocalisation.localisationPostalCode} ${user.user.user.userLocalisation.localisationCity}`
      */} </Text>
      <Divider />
      {user.user.accountType === "partner" &&
        <Text> Vous êtes <b>Partenaire</b></Text>}
      {user.user.accountType === "admin" &&
        <Text> Vous êtes <b>Administrateur</b></Text>}
      <Divider />
      
      <MapView />
      <Divider /><Divider />
      <View style={{ flexDirection: "row" }}>
        <Button title="Modifier" onPress={() => navigation.push('UpdateAccount')} />
        <Text> </Text>
        <Button title="Deconnexion" onPress={trylogout} />
      </View>

    </View>

  );
}

export default ProfileScreen;