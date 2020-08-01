import React, { useState } from 'react'
import Auth from '../../utilities/Auth/Auth'
import { Redirect } from 'react-router-dom'
import apiEndpoints from '../../common/Api/ApiEndpoints'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  LinearProgress
} from '@material-ui/core/'
import Alert from '@material-ui/lab/Alert'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import validator from 'validator'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/mohammed-ramadan-85664898/" target="_blank">
        Ramadanko's starter kit for react
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%'
  }
}))

const Login = () => {

  const classes = useStyles()
  let [url, setUrl] = useState('/')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [isLoggedIn, setLoggedIn] = useState(false)
  let [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const isFormValid = () => {
    const errors = {}
    if (!validator.isEmail(email)) {
      errors.email = 'Please enter a valid Email address.'
    }

    if (validator.isEmpty(password)) {
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
    let body = { email, password }
    Auth.login(body, apiEndpoints.login)
      .then((data) => {
        let url = Auth.getRedirectedUrl()
        url = url ? url : '/'
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
        isLoggedIn ?
          <Redirect to={url}/> :
          <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {errors.onSaving &&
              <Alert variant="filled" severity="error" className={classes.alert}>
                {errors.onSaving}
              </Alert>
              }

              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmail}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePassword}
                  error={errors.password ? true : false}
                  helperText={errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={saving}
                >
                  Sign In
                </Button>
                {saving && <LinearProgress/>}
              </form>
            </div>
            <Box mt={8}>
              <Copyright/>
            </Box>
          </Container>
      }
    </>
  )
}

export default Login
