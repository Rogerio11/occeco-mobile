import RootReducer from "./reducers/RootReducer";
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const configureStore = () => {
  let store = createStore(persistedReducer,applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore;