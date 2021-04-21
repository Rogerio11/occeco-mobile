import RootReducer from "./reducers/RootReducer";
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { store, persistor }
}

export default configureStore;