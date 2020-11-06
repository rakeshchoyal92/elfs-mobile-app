// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import monitorReducersEnhancer from '@store/enhancers/monitorReducer'
// import rootReducer from '@store/reducers'

import { applyMiddleware, createStore } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducers from './reducers'

import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import monitorReducerEnhancer from '@store/enhancers/monitorReducer'

const logger = createLogger({
  collapsed: true,
})

export default function configureStore() {
  const middlewares = applyMiddleware(thunk, promise)
  return createStore(reducers, composeWithDevTools(middlewares))
}

// export default function configureAppStore(preloadedState) {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: [...getDefaultMiddleware(), thunk, promise, logger],
//     preloadedState,
//     enhancers: [monitorReducersEnhancer],
//   })
//
//   // if (process.env.NODE_ENV !== 'production' && module.hot) {
//   //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   // }
//
//   return store
// }
