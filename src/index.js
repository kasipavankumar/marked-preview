import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import App from './containers/App'
import { editor, preview } from './redux/reducers'

import './static/scss/index.scss'

const rootReducers = combineReducers({ editor, preview })
const store = createStore(rootReducers)

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
