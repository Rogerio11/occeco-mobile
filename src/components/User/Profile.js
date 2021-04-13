import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector} from "react-redux";
import { Card } from 'react-native-elements'

function ProfileScreen({ navigation }) {
    const user = useSelector(state => state.User);

    return (
      <Card>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Mail : {user.user.account.accountMail}</Text>
          <Card.Divider />
          <Text>Catégories choisies : TODO !</Text>
          {/* user.user.userCategories.map(c => <Text>{c}</Text>) */}
          <Text>Distance : {user.user.userDistance}</Text>
          <Text>Type user : {user.user.account.accountType}</Text>
          <Button title="Go to Home" onPress={() => navigation.navigate('Homepage')} />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </Card>
      );
    }

export default ProfileScreen;