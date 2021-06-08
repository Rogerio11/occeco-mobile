import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch, connect } from "react-redux";
import { logout, sendDailyNotifications } from '../../actions/UserActions';
import { Button, Divider, Icon, Card, Text } from 'react-native-elements';
import MapViewScreen from './MapView';
import { customLongSuccessAlert } from "../Utils/Alerts";
import MaterialChip from "react-native-material-chip";
import { ViewBase } from 'react-native';

function ProfileScreen({ navigation }) {
  const user = useSelector(state => state.User);
  const errorNotifications = useSelector(state => state.User.errorNotifications);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (errorNotifications) {
      customInfiniteErrorAlert(errorNotifications);
    }
  }, [errorNotifications]);

  const trylogout = () => {
    dispatch(logout())
    navigation.navigate('Accueil')
  }

  const trySendNotifications = () => {
    customLongSuccessAlert("Vous avez demandé à renvoyer les notifications d'aujourd'hui")
    dispatch(sendDailyNotifications())
  }

  const position = user.user && user.user.user && user.user.user.userLocalisation || [43.608294, 3.879343]

  return (
    <Card containerStyle={{ width: '99%', height: '99%' }}>

      <Text h3>Mon Compte</Text>
      <Divider /><Divider />
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="mail"
          type="ionicon" />
        <Text> {user.user.accountMail}</Text>
      </View>

      <Divider />

      

      <Divider />

      {/* <Text>Catégories choisies : </Text>

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
      }  */}

      <Divider />
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="locate"
          type="ionicon" />
        <Text>{user.user.user && user.user.user.userDistance} km</Text>
      </View>

      <Divider />
      {user.user.accountType === "partner" &&
        <Text> Vous êtes Partenaire</Text>}
      <Divider /><Divider />

      <View style={{width:'100%', height:'30%'}}>
       {  <MapViewScreen /> }
      </View>
    

      <View style={{ flexDirection: "row" }}>
        <Button style={{ minWidth: '50%' }} title="Modifier" onPress={() => navigation.push('Modifier mon compte')} />
        <Text> </Text>
        <Button style={{ minWidth: '50%' }} title="Deconnexion" onPress={trylogout} />
      </View>

      <Divider />

      <Text>Vous ne recevez pas les notifications ?</Text>
      <Button title="Notifications" onPress={() => navigation.push('Notifications')} />

      
      {user.user.accountType === "admin" &&
        <View>
          <Text> Vous êtes Administrateur</Text>
          <Text> Renvoyer les notifications du jour ? </Text>
          <Button title="Renvoyer" onPress={trySendNotifications} />
        </View>}

    </Card>


  );
}


export default ProfileScreen;
