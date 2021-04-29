import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from "react-redux";
import { login } from "../../actions/UserActions";
import { Card, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wrongInputsAlert } from "../Utils/Alerts";

function LoginScreen({ navigation }) {
  const initialAccount = {
    accountMail: "",
    accountPassword: ""
  }
  const dispatch = useDispatch();
  const [account, setAccount] = React.useState(initialAccount);
  const [showPassWord, setShowPassword] = React.useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt;
    setAccount({ ...account, [name]: value })
  }

  const tryLogin = () => {
    if (!account || !account.accountMail || !account.accountPassword) {
      wrongInputsAlert()
    } else {
      console.log("trylogin", account)
      dispatch(login(account));
      setAccount(initialAccount);
      navigation.navigate('Accueil');
    }
  };

  return (
    <Card>
      <View>
        <Input
          placeholder="Mail"
          value={account.accountName}
          name="accountMail"
          onChangeText={(evt) => handleChange({ name: "accountMail", value: evt })}
          leftIcon={
            <Ionicons
              name='mail'
              size={24}
              color='gray'
            />
          }
        />
        <Input
          placeholder="Password"
          value={account.accountPassword}
          name="accountPassword"
          onChangeText={(evt) => handleChange({ name: "accountPassword", value: evt })}
          secureTextEntry={!showPassWord}
          rightIcon={
            <Ionicons
              name={showPassWord ? 'eye-off' : 'eye'}
              size={24}
              color='gray'
              onPress={() => setShowPassword(!showPassWord)}
            />
          }
          leftIcon={
            <Ionicons
              name='key'
              size={24}
              color='gray'
            />
          }
        />
        <Button title="Connexion" onPress={tryLogin} />
      </View>
    </Card>
  );
}

export default LoginScreen;