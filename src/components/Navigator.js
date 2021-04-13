import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './User/Homepage';
import LoginScreen from './User/Login';
import SignUpScreen from './User/SignUp';
import ProfileScreen from './User/Profile';
import ArticleScreen from './Article/Article';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    <Tab.Navigator>
      <Tab.Screen name="Articles" component={ArticleStackNavigator} />
      <Tab.Screen name="Mon Compte" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default Navigator;