import React from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import Store from "./src/Store";

function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Navigator />
      </Provider>
  </NavigationContainer>
  );
}

export default App;