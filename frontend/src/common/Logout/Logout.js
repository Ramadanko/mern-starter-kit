import React from 'react'
import Auth from '../../utilities/Auth/Auth'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    Auth.logout()
    this.setState({ redirect: true })
  }

  render () {
    return (
      this.state.redirect
        ? <Redirect to='/login' />
        : <span onClick={this.handleLogout}>Logout</span>
    )
  }
}

export default Logout
