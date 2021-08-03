import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'

import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'elfs-mobile-app-1',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const actionLogger = (store) => (next) => (action) => {
  console.log(`Middleware triggered: ${action.type} | ${action.data}`)
  next(action)
}

export default function configureStore() {
  const middlewares = applyMiddleware(thunk, promise, actionLogger)
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducer, composeWithDevTools(middlewares))
  const persistor = persistStore(store)
  // persistor.purge()
  return {
    store,
    persistor,
  }
}
