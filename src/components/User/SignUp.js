import React from 'react';
import { View, Button } from 'react-native';
import {useDispatch} from "react-redux";
import {signup} from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements'

function SignUpScreen({ navigation }) {
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
    const trySignup = () => {
      console.log("trySignin=", user)
      dispatch(signup(user));
      setUser(initialUser);
      navigation.navigate('Homepage')
  };
    
    return (
      <Card>
        <View>
          <Input
            placeholder="Mail"
            value={user.userName}
            name="userMail"
            onChangeText={(evt) => handleChange({name: "userMail", value: evt})}
          />
          <Input
            placeholder="Password"
            value={user.userPassword}
            name="userPassword"
            onChangeText={(evt) => handleChange({name: "userPassword", value: evt})}
            secureTextEntry
          />
          <Button title="Inscription" onPress={trySignup} />
          <Button title="Go to Home" onPress={() => navigation.navigate('Homepage')} />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </Card>
    );
  }

export default SignUpScreen;