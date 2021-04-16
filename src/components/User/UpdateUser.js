import React from 'react';
import { View, Button } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements'

function UpdateUserScreen({ navigation }) {
    
    const dispatch = useDispatch();
    const initialuser = useSelector(state => state.User);
    
    const [user, setUser] = React.useState(initialuser.user.user);
    const handleChange = (evt) => {
        const { name, value } = evt;

        if (name.split('.').length > 1){
          const newName = name.split('.')[1]
          setUser({...user, userLocalisation:{...user.userLocalisation,[newName] : value}})
        }
        else {setUser({...user, [name] : value})}
        
    }
    const tryUpdate = () => {
      console.log("tryUpdate", user)
      dispatch(updateUser(user));
  };
    
    return (
      <Card>
        <View>
          <Input
            placeholder="Numéro de rue"
            value={user.userLocalisation && user.userLocalisation.localisationNumber}
            name="userLocalisation.localisationNumber"
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationNumber", value: evt})}
          />
          <Input
            placeholder="Rue"
            value={user.userLocalisation && user.userLocalisation.localisationStreet}
            name="userLocalisation.localisationStreet"
            onChangeText={(evt) => handleChange({name: "userLocalisation.localisationStreet", value: evt})}
            
          />
          <Button title="Modifier" onPress={tryUpdate} />
        </View>
      </Card>
    );
  }

export default UpdateUserScreen;