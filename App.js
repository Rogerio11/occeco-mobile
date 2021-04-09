import React from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './src/components/User/Homepage';
import LoginScreen from './src/components/User/Login';
import SignUpScreen from './src/components/User/SignUp';
import ProfileScreen from './src/components/User/Profile';
import Store from "./src/Store";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator initialRouteName="Homepage">
          <Stack.Screen name="Homepage" component={HomepageScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </Provider>
  </NavigationContainer>
  );
}

export default App;