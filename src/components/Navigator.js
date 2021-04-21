import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './User/Homepage';
import LoginScreen from './User/Login';
import SignUpScreen from './User/SignUp';
import UpdateUserScreen from './User/UpdateUser'
import UpdateAccountScreen from './User/UpdateAccount'
import ProfileScreen from './User/Profile';
import ArticleScreen from './Article/Article';
import ModifyAccountTypeScreen from './User/ModifyAccountType';
import TypeArticleList from './TypeArticle/TypeArticleList';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Accueil" component={HomepageScreen} />
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="Inscription" component={SignUpScreen} />
      <Stack.Screen name="Profil" component={ProfileScreen} />
      <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
      <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />

    </Stack.Navigator>
  );
}

const ArticleStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="Catégories" component={TypeArticleList} />
      
    </Stack.Navigator>
  );
}

const PartnerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Article" component={ArticleScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Navigator = () => {

  const user = useSelector(state => state.User);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mon Compte') {
            iconName = 'ios-person';
          } else if (route.name === 'Articles') {
            iconName = 'ios-list';
          } else if (route.name === 'Préférences') {
            iconName = 'ios-settings';
          }
          else if (route.name === 'Partenaires') {
            iconName = 'ios-people';
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
      { user && user.user
        ? <Tab.Screen name="Préférences" component={UpdateUserScreen} />
        : <></>
      }
      { user && user.user && user.user.accountType == "admin"
        ? <Tab.Screen name="Partenaires" component={ModifyAccountTypeScreen} />
        : <></>
      }

      <Tab.Screen name="Articles" component={ArticleStackNavigator} />
    </Tab.Navigator>
  );
};

export default Navigator;