import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector} from "react-redux";

function ProfileScreen({ navigation }) {
    const user = useSelector(state => state.User);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Profile Screen</Text>
          <Text>Mail : {user.user.userMail}</Text>
          <Text>Catégories choisies : TODO !</Text>
          {/* user.user.userCategories.map(c => <Text>{c}</Text>) */}
          <Text>Distance : {user.user.userDistance}</Text>
          <Text>Type user : {user.user.userType}</Text>
          <Button title="Go to Home" onPress={() => navigation.navigate('Homepage')} />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      );
    }

export default ProfileScreen;