import React from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/components/Navigator';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore  from "./src/Store";
import Loading from './src/components/Loading'
import { ThemeProvider } from 'react-native-elements';
import theme from './theme';
import FlashMessage from "react-native-flash-message";
import 'leaflet/dist/leaflet.css'

function App() {
  const store = configureStore().store;
  const persistor = configureStore().persistor;
  return (
    <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
          <Navigator />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
  </NavigationContainer>
  </ThemeProvider>
  );
}

export default App;