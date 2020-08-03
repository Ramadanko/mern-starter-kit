import loadable from '@loadable/component'
import React from 'react'
import Auth from '../../utilities/Auth/Auth'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CssBaseline } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import Header from '../../common/Header/Header'

const fallback = <CircularProgress />
const Home = loadable(() => import('../Home/Home'), { fallback })
const PageNotFound = loadable(() => import('../PageNotFound/PageNotFound'))

function App () {
  const location = useLocation()
  if (!Auth.isLoggedIn()) {
    Auth.setRedirectedUrl(location.pathname)
    return <Redirect to='/login' />
  }
  return (
    <>
      <Helmet>
        <title>Mern Starter Kit</title>
        <meta name='description' content='A starter kit for building web apps using MongoDB, ExpressJS, ReactJS & NodeJS' />
      </Helmet>
      <CssBaseline />
      <Header />
      <div className='main-content'>
        <Switch>
          <Route exact path='/'> <Home /></Route>
          <Route><PageNotFound /></Route>
        </Switch>
      </div>
    </>
  )
}

export default App
