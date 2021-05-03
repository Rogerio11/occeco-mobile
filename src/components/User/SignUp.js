import React from 'react';
import { View } from 'react-native';
import { useDispatch } from "react-redux";
import { signup } from "../../actions/UserActions";
import { Card, Input, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wrongInputsAlert } from "../Utils/Alerts";


function SignUpScreen({ navigation }) {
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

  const trySignup = () => {
    if (!account || !account.accountMail || !account.accountPassword) {
      wrongInputsAlert()
    } else {
      console.log("trySignin=", account)
      dispatch(signup(account));
      setAccount(initialAccount);
      navigation.navigate('Accueil')
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
        <Button title="Inscription" onPress={trySignup} />

      </View>
    </Card>
  );
}

export default SignUpScreen;