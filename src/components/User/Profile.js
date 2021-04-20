import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/UserActions';
import { Card, CheckBox, Button, Text, Input, Icon } from 'react-native-elements';


function ProfileScreen({ navigation }) {
  const user = useSelector(state => state.User);

  const dispatch = useDispatch();
  const trylogout = () => {
    dispatch(logout())
    navigation.navigate('Accueil')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text h3> Mon Compte</Text>
      <br />
      <Icon
        name='mail'
        type='feather'
      />
      <Text> <b />Mail : {user.user.accountMail}</Text>
      <br />
      <Icon
        name='shopping-cart'
        type='entypo'
      />
      <Text>Catégories choisies : TODO !</Text>
      <br />
      <Icon
        name='globe'
        type='entypo'
      />
      <Text>Distance : {user.user.user.userDistance} km</Text>
      <br />
      {user.user.accountType === "partner" &&
        <Text> Vous êtes <b>Partenaire</b></Text>}
      {user.user.accountType === "admin" &&
        <Text> Vous êtes <b>Administrateur</b></Text>}
      <br />

      <View style={{ flexDirection: "row" }}>
        <Button title="Modifier" onPress={() => navigation.push('Update')} />
        <Text> </Text>
        <Button title="Deconnexion" onPress={trylogout} />
      </View>

    </View>

  );
}

export default ProfileScreen;