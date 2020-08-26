import loadable from '@loadable/component'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import createStore from './redux/store'
import initialState from './redux/initialState'

const store = createStore(Object.assign({}, initialState));

const App = loadable(() => import('./components/App/App'))
const Login = loadable(() => import('./components/Login/Login'))

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <Switch>
        <Route path='/login'><Login /></Route>
        <Route path='/'><App /></Route>
      </Switch>
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
