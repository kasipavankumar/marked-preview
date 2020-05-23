import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import * as serviceWorker from './serviceWorker'

import App from './containers/App'
import { editorReducers } from './redux/reducers'

import './static/scss/index.scss'

const logger = createLogger()
const rootReducers = combineReducers({ editorReducers })
const store = createStore(rootReducers, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
