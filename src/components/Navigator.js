import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './User/Homepage';
import LoginScreen from './User/Login';
import SignUpScreen from './User/SignUp';
import ProfileScreen from './User/Profile';
import ArticleScreen from './Article/Article';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Accueil" component={HomepageScreen} />
            <Stack.Screen name="Connexion" component={LoginScreen} />
            <Stack.Screen name="Inscription" component={SignUpScreen} />
            <Stack.Screen name="Profil" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

const ArticleStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Article" component={ArticleScreen} />
      </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mon Compte') {
            iconName = 'ios-person';
          } else if (route.name === 'Articles') {
            iconName = 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        activeBackgroundColor: "green",
      }}
    >
      <Tab.Screen name="Mon Compte" component={ProfileStackNavigator} />
      <Tab.Screen name="Articles" component={ArticleStackNavigator} />
    </Tab.Navigator>
  );
};

export default Navigator;