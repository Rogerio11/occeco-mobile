import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch, connect } from "react-redux";
import { logout } from '../../actions/UserActions';
import { Button, Divider, Icon, Card, Text } from 'react-native-elements';
import MapViewScreen from './MapView';
import MaterialChip from "react-native-material-chip";

function ProfileScreen({ navigation }) {
  const user = useSelector(state => state.User);

  const dispatch = useDispatch();
  const trylogout = () => {
    dispatch(logout())
    navigation.navigate('Accueil')
  }
  console.log(user.user.user)
  return (
    <Card containerStyle={{ width: '99%', height: '99%' }}>

      <Text h3>Mon Compte</Text>

      <Divider /><Divider />
      <Text><Ionicons name="mail" size="large" /> {user.user.accountMail}</Text>
      <Divider />

      <Text>Catégories choisies : </Text>

      {user.user && user.user.user && user.user.user.userCategories && user.user.user.userCategories.map(cat =>
        <MaterialChip
          key={cat._id}
          text={cat.nameType}
          leftIcon={
            <Icon name={cat.iconType} type="material-community" size={18} />
          }
          style={{
            borderBottomColor: cat.colorType,
            borderLeftColor: cat.colorType,
            borderTopColor: cat.colorType,
            borderRightColor: cat.colorType,
            borderBottomWidth: '3px',
            borderTopWidth: '3px',
            borderLeftWidth: '3px',
            borderRightWidth: '3px',
          }}
        />)
      }

      <Divider />

      <Text><Ionicons name="locate" size="large" />  {user.user.user && user.user.user.userDistance} km</Text>

      <Divider />

      {user.user.accountType === "partner" &&
        <Text> Vous êtes Partenaire</Text>}
      {user.user.accountType === "admin" &&
        <Text> Vous êtes Administrateur</Text>}


      {/* <MapViewScreen /> */}

      <Divider /><Divider />
      <View style={{ flexDirection: "row" }}>
        <Button style={{ minWidth: '50%' }} title="Modifier" onPress={() => navigation.push('UpdateAccount')} />
        <Text> </Text>
        <Button style={{ minWidth: '50%' }} title="Deconnexion" onPress={trylogout} />
      </View>

      <Button title="Notifications" onPress={() => navigation.push('EnableNotifications')} />

    </Card>


  );
}


export default ProfileScreen;
