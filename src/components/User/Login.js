import React from 'react';
import { View, Button, TextInput } from 'react-native';
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserActions";

function LoginScreen({ navigation }) {
    const initialUser = {
        userMail : "",
        userPassword: ""
    }
    const dispatch = useDispatch();
    const [user, setUser] = React.useState(initialUser);
    const handleChange = (evt) => {
        const { name, value } = evt;
        setUser({...user, [name] : value})
    }
    const tryLogin = () => {
      console.log("trylogin=", user)
      dispatch(login(user));
      setUser(initialUser);
      navigation.navigate('Homepage');
  };
    
    return (
      <View>
        <TextInput
          placeholder="Mail"
          value={user.userName}
          name="userMail"
          onChangeText={(evt) => handleChange({name: "userMail", value: evt})}
        />
        <TextInput
          placeholder="Password"
          value={user.userPassword}
          name="userPassword"
          onChangeText={(evt) => handleChange({name: "userPassword", value: evt})}
          secureTextEntry
        />
        <Button title="Connexion" onPress={tryLogin} />
        <Button title="Go to Home" onPress={() => navigation.navigate('Homepage')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

export default LoginScreen;