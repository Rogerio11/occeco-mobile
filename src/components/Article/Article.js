import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';

function ArticleScreen({ navigation }) {
  const user = useSelector(state => state.User)
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Bienvenue sur l'appli OCCECO
      </Text>

      <Text>TODO : Affichage liste articles</Text>
      {
        user && user.user && (user.user.accountType === "admin" || user.user.accountType === "partner") &&
        <Button
          title="Voir Catégories"
          onPress={() => navigation.push('Catégories')}
        />
      }
      
      
    </View>
    
  );
}

export default ArticleScreen;