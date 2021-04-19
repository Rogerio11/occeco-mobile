import React, {useState} from 'react';
import { View, Button} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements'

function UpdateUserScreen({ navigation }) {
  const user = useSelector(state => state.User);
  console.log(user)
  const dispatch = useDispatch();

  const [userUpdated, setUserUpdated] = useState(user.user.user)
  const tryUpdate = () => {

      console.log("tryUpadate", userUpdated)
      dispatch(updateUser(userUpdated));
      navigation.goBack();
  };

  const handleChange = (evt) => {
    const { name, value } = evt;
    setUserUpdated({...userUpdated, [name] : value})
}
    
    return (
      <Card>
        <View>
          
          <Input
            placeholder="Distance"
            value={userUpdated.userDistance}
            name="userDistance"
            onChangeText={(evt) => handleChange({name: "userDistance", value: evt})}
          />
          <Button title="Modifier" onPress={tryUpdate}/>
        </View>
      </Card>
    );
  }

export default UpdateUserScreen;