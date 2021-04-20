import React from 'react';
import { View, Button } from 'react-native';
import {useDispatch} from "react-redux";
import {login} from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements'

function LoginScreen({ navigation }) {
    const initialAccount = {
        accountMail : "",
        accountPassword: ""
    }
    const dispatch = useDispatch();
    const [account, setAccount] = React.useState(initialAccount);
    const handleChange = (evt) => {
        const { name, value } = evt;
        setAccount({...account, [name] : value})
    }
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
            placeholder="Mail"
            value={account.accountName}
            name="accountMail"
            onChangeText={(evt) => handleChange({name: "accountMail", value: evt})}
          />
          <Input
            placeholder="Password"
            value={account.accountPassword}
            name="accountPassword"
            onChangeText={(evt) => handleChange({name: "accountPassword", value: evt})}
            secureTextEntry={true}
          />
          <Button title="Connexion" onPress={tryLogin} buttonStyle={{backgroundColor:'green'}}/>
        </View>
      </Card>
    );
  }

export default LoginScreen;