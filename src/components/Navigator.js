import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageScreen from './User/Homepage';
import LoginScreen from './User/Login';
import SignUpScreen from './User/SignUp';
import UpdateUserScreen from './User/UpdateUser'
import UpdateAccountScreen from './User/UpdateAccount'
import ProfileScreen from './User/Profile';
import ModifyAccountTypeScreen from './User/ModifyAccountType';
import EnableNotificationsScreen from './User/EnableNotifications';
import ListArticleScreen from './Article/ListArticle';
import ArticleScreen from './Article/Article';
import AddArticleScreen from './Article/AddArticle';
import DuplicateArticleScreen from './Article/DuplicateArticle';
import UpdateArticleScreen from './Article/UpdateArticle';
import DeleteArticleScreen from './Article/DeleteArticle';
import TypeArticleList from './TypeArticle/TypeArticleList';
import AddTypeArticle from './TypeArticle/AddTypeArticle';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';
import { useSelector } from "react-redux";
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Accueil" component={HomepageScreen} />
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="Inscription" component={SignUpScreen} />
      <Stack.Screen name="Profil" component={ProfileScreen} />
      
      <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
      <Stack.Screen name="EnableNotifications" component={EnableNotificationsScreen} />

    </Stack.Navigator>
  );
}

const ArticleStackNavigator = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Liste Article" component={ListArticleScreen} />
       <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="Catégories" component={TypeArticleList} />
      <Stack.Screen name="Add Article" component={AddArticleScreen} />
      <Stack.Screen name="Duplicate Article" component={DuplicateArticleScreen} />
      <Stack.Screen name="Update Article" component={UpdateArticleScreen} />
      <Stack.Screen name="Create TypeArticle" component={AddTypeArticle} />
      <Stack.Screen name="Delete Article" component={DeleteArticleScreen} />
    </Stack.Navigator>
  );
}

const PreferenceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Préférences" component={UpdateUserScreen} />
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
            iconName = 'person';
          } else if (route.name === 'Articles') {
            iconName = 'list';
          } else if (route.name === 'Préférences') {
            iconName = 'settings';
          }
          else if (route.name === 'Partenaires') {
            iconName = 'people';
          }

          // You can return any component that you like here!
          return <Icon type="ionicons" name={iconName} size={size} color={color} />;
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
        ? <Tab.Screen name="Préférences" component={PreferenceStackNavigator} />
        : <></>
      }
      { user && user.user && user.user.accountType == "admin"
        ? <Tab.Screen name="Partenaires" component={ModifyAccountTypeScreen} />
        : <></>
      }
      { user && user.user 
        ? <Tab.Screen name="Articles" component={ArticleStackNavigator} />
        : <></>
      }

      
    </Tab.Navigator>
  );
};

export default Navigator;