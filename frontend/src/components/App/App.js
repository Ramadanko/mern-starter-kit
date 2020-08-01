import loadable from '@loadable/component';
import React from 'react';
import Auth from '../../utilities/Auth/Auth'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { CssBaseline } from '@material-ui/core'

const fallback = <CircularProgress />
const Home = loadable(() => import("../Home/Home"), { fallback });
const PageNotFound = loadable(() => import("../PageNotFound/PageNotFound"))

function App() {
  let location = useLocation();
  debugger;
  if (!Auth.isLoggedIn()) {
    Auth.setRedirectedUrl(location.pathname)
    return <Redirect to="/login" />
  }
  return (
    <>
      <CssBaseline />
      <div className="main-content">
        <Switch>
          <Route exact path="/"> <Home /></Route>
          <Route><PageNotFound /></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
