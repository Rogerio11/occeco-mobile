import React from 'react';
import { View, Text } from 'react-native';

function ArticleScreen({ navigation }) {

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Bienvenue sur l'appli OCCECO
      </Text>

      <Text>TODO : Affichage liste articles</Text>
      
      
    </View>
    
  );
}

export default ArticleScreen;