import '../../utilities/Axios/Interceptor'
import loadable from '@loadable/component'
import React from 'react'
import Auth from '../../utilities/Auth/Auth'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'
import { Container, CssBaseline } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import Header from '../../common/Header/Header'

const fallback = <BackdropLoader />
const Home = loadable(() => import('../Home/Home'), { fallback })
const PageNotFound = loadable(() => import('../PageNotFound/PageNotFound'))
const TaskRoute = loadable(() => import('../Task/TaskRoute'), { fallback });

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
      <br/>
      <Container maxWidth={false} className='main-content' style={{marginBottom: '30px'}}>
        <Switch>
          <Route exact path='/'> <Home /></Route>
          <Route path='/task'> <TaskRoute /></Route>
          <Route><PageNotFound /></Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
