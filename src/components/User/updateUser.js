import React from 'react';
import { View, Button } from 'react-native';
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements'


function UpdateUserScreen({ navigation }) {
    const user = {
        accountMail : "",
        accountPassword: ""
    }
   /* const dispatch = useDispatch();
    const [account, setAccount] = React.useState(initialAccount);
    const handleChange = (evt) => {
        const { name, value } = evt;
        setAccount({...account, [name] : value})
    }*/
    const tryLogin = () => {
      console.log("trylogin", account)
      dispatch(login(account));
      setAccount(initialAccount);
      navigation.navigate('Accueil');
  };
    
    return (
      <Card>
        <View>
          
          <Input
            placeholder="userDistance"
            value="10"
            name="userDistance"
            onChangeText={(evt) => handleChange({name: "accountPassword", value: evt})}
          />
          <Button title="Modifier" />
        </View>
      </Card>
    );
  }

export default UpdateUserScreen;