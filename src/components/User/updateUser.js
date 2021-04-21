import React, {useState} from 'react';
import { View } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../actions/UserActions";
import { Card, Input, Button, Slider, Text, useTheme } from 'react-native-elements'

function UpdateUserScreen({ navigation }) {
  const user = useSelector(state => state.User);
  const dispatch = useDispatch();
  const [userUpdated, setUserUpdated] = useState(user.user.user);
  const { theme } = useTheme();

  const tryUpdate = () => {
      console.log("tryUpadate", userUpdated)
      dispatch(updateUser(userUpdated));
      navigation.goBack();
      setUserUpdated(user)
  };

  const handleChange = (evt) => {
    const { name, value } = evt;

    if (name.split('.').length > 1){
      const newName = name.split('.')[1]
      setUserUpdated({...userUpdated, userLocalisation:{...userUpdated.userLocalisation,[newName] : value}})
    }
    else {setUserUpdated({...userUpdated, [name] : value})}
    
}
    
    return (
      <Card>
        <View>


        <Text>Distance : {userUpdated.userDistance} km</Text>
        <Slider
          value={userUpdated.userDistance}
          maximumValue={200}
          minimumValue={0}
          step={1}
          onValueChange={(evt) => handleChange({name: "userDistance", value: evt})}
          thumbStyle={{ height: 20, width: 20, backgroundColor: theme.colors.primary }}
        />
        
        <Text>Adresse : </Text>
          
          <Input
            placeholder="N° de rue"
            value={userUpdated.userLocalisation && userUpdated.userLocalisation.localisationNumber}
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationNumber", value: evt})}
          />
          <Input
            placeholder="Rue"
            value={userUpdated.userLocalisation && userUpdated.userLocalisation.localisationStreet}
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationStreet", value: evt})}
          />
          <Input
            placeholder="Code Postal"
            value={userUpdated.userLocalisation && userUpdated.userLocalisation.localisationPostalCode}
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationPostalCode", value: evt})}
          />
          <Input
            placeholder="Ville"
            value={userUpdated.userLocalisation && userUpdated.userLocalisation.localisationCity}
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationCity", value: evt})}
          />
          <Button title="Modifier" onPress={tryUpdate}/>
        </View>
      </Card>
    );
  }

export default UpdateUserScreen;