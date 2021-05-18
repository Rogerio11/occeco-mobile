import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/UserActions";
import { Card, Input, Button, Slider, Text, useTheme, Icon, CheckBox } from 'react-native-elements'
import { wrongInputsAlert } from "../Utils/Alerts";
import {getAllTypes} from "../../actions/TypeArticleActions";
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker, Circle } from 'react-native-maps';


function UpdateUserScreen({ navigation }) {
  const user = useSelector(state => state.User);
  const list = useSelector(state => state.TypeArticle);
  const [userUpdated, setUserUpdated] = useState(user.user.user);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const position = user.user.user.userLocalisation || [43.608294, 3.879343]
  const [pos, setPos] = useState(position)
  const [listType, setListType] = useState(Array.isArray(list.typesArticle) ? list.typesArticle : []);
  const [delta, setDelta] = useState({lat:0.01, lng:0.01})
/*
  if (listType.length === 0 ){
    dispatch(getAllTypes());
    setListType(useSelector(state => state.TypeArticle))
  }
*/
  const tryUpdate = () => {
    console.log("tryUpdate", userUpdated)
    dispatch(updateUser(userUpdated));
    navigation.goBack();
  };

  const handleChange = (evt) => {

    const { name, value } = evt;
    setUserUpdated({ ...userUpdated, [name]: value })

  }
  const changeCategories = (type) => {
    const value = userUpdated.userCategories.some(t => t._id === type._id);

    handleChange({
      name: 'userCategories',
      value: value ? userUpdated.userCategories.filter(t => t._id !== type._id) : [...userUpdated.userCategories, type]
    })
  }
  const changePosition = (evt) => {
    setUserUpdated({ ...userUpdated, userLocalisation: { lat: evt.latitude, lng: evt.longitude}})
    setDelta({lat: evt.latitudeDelta, lng: evt.longitudeDelta})
  }

  return (
    <Card containerStyle={{width:'99%', height:'99%'}}>
        <Text>Distance : {userUpdated.userDistance} km</Text>
        <Slider
          value={userUpdated.userDistance}
          maximumValue={200}
          minimumValue={0}
          step={1}
          onValueChange={(evt) => handleChange({ name: "userDistance", value: evt })}
          thumbStyle={{ height: 20, width: 20, backgroundColor: theme.colors.primary }}
        />

        <Text>Adresse : </Text>
        <View style={{width:'100%', height:'50%'}}>
        <MapView
          style={{flex:1}}
          region={{
              latitude: userUpdated.userLocalisation && userUpdated.userLocalisation.lat,
              longitude: userUpdated.userLocalisation && userUpdated.userLocalisation.lng,
              latitudeDelta: delta.lat,
              longitudeDelta: delta.lng
          }}
          onRegionChange={changePosition}
        >
          <Marker 
            coordinate={{ latitude : userUpdated.userLocalisation && userUpdated.userLocalisation.lat , longitude : userUpdated.userLocalisation && userUpdated.userLocalisation.lng }}
          />
          <Circle 
              center={{ latitude : userUpdated.userLocalisation && userUpdated.userLocalisation.lat , longitude : userUpdated.userLocalisation && userUpdated.userLocalisation.lng }} 
              radius={userUpdated.userDistance*1000} 
              fillColor={"rgba(137,209,254,.4)"}
            />
          
        </MapView>
        </View>
        <Text>Catégories : </Text>
        {
          listType.map(t =>
            <CheckBox
              key={t._id}
              title={t.nameType}
              checked={userUpdated.userCategories.some(type => t._id === type._id)}
              onPress={() => changeCategories(t)}
            />
          )
          
        }

        <Button title="Modifier" onPress={tryUpdate} />
      
    </Card>
  );
}

export default UpdateUserScreen;