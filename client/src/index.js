import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker'

import reducers from './redux'
import App from './components/App'

// ~ SETUP REDUX ..............................................................
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = null
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger()

  store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
  )
} else {
  // Production store doesn't log state changes or interact w/ dev ext.
  store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}

// ~ INITIALIZE APP ...........................................................
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
