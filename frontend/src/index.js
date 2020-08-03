import loadable from '@loadable/component'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = loadable(() => import('./components/App/App'))
const Login = loadable(() => import('./components/Login/Login'))

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/login'><Login /></Route>
      <Route path='/'><App /></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
