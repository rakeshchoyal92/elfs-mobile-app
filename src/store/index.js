import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'

import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['auth'],
}

export default function configureStore() {
  const middlewares = applyMiddleware(thunk, promise)
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducer, composeWithDevTools(middlewares))
  const persistor = persistStore(store)
  // persistor.purge()
  return {
    store,
    persistor,
  }
}
