import React from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore  from "./src/Store";
import Loading from './src/components/Loading'

function App() {
  const store = configureStore().store;
  const persistor = configureStore().persistor;
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
  </NavigationContainer>
  );
}

export default App;