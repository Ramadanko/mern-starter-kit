import React, { useState } from 'react'
import Auth from '../../utilities/Auth/Auth'
import { Redirect } from 'react-router-dom'
import apiEndpoints from '../../common/Api/ApiEndpoints'
import {isEmail, isEmpty} from 'validator'
import LoginUI from './LoginUI'

const Login = () => {
  const [url, setUrl] = useState('/')
  const [email, setEmail] = useState('mohammed.ramadanko@gmail.com')
  const [password, setPassword] = useState('password')
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const isFormValid = () => {
    const errors = {}
    if (!isEmail(email)) {
      errors.email = 'Please enter a valid Email address.'
    }

    if (isEmpty(password)) {
      errors.password = 'Invalid password.'
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid()) {
      return
    }
    setSaving(true)
    const body = { email, password }
    Auth.login(body, apiEndpoints.login)
      .then((data) => {
        let url = Auth.getRedirectedUrl()
        url = url || '/'
        setUrl(url)
        setLoggedIn(true)
      })
      .catch((err) => {
        setSaving(false)
        setErrors({ onSaving: err.message })
      })
  }

  return (
    <>
      {
        isLoggedIn
          ? <Redirect to={url} />
          : <LoginUI errors={errors} handleSubmit={handleSubmit} handleEmail={handleEmail}
                     handlePassword={handlePassword} saving={saving} email={email} password={password} />
      }
    </>
  )
}

export default Login
