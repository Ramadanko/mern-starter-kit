class Auth {

  constructor () {
    this.loggedIn = false
    this.redirectedUrl = false
    this.TOKEN_KEY = 'appToken'
    this.USER_KEY = 'APP_USER'
    this.EXPIRES_AT_KEY = 'expiresAt'
  }

  login (data, loginUrl) {
    return new Promise((resolve, reject) => {
      fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.status !== 200) {
            return res.json().then(res => { throw res })
          }
          return res.json()
        })
        .then((res) => {
          this.setLoginSession(res)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  logout () {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
    localStorage.removeItem(this.EXPIRES_AT_KEY)
  }

  isLoggedIn () {
    const expiresAt = JSON.parse(localStorage.getItem(this.EXPIRES_AT_KEY))
    return Date.now() < expiresAt
  }

  setLoginSession = (response) => {
    this.loggedIn = true
    localStorage.setItem(this.TOKEN_KEY, response.token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user))
    localStorage.setItem(this.EXPIRES_AT_KEY, response.expiresAt)
  }

  getAuthHeader = (tokenName = '') => {
    return tokenName !== '' ? tokenName : 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
  }

  setRedirectedUrl = (url) => {
    this.redirectedUrl = url
  }

  getRedirectedUrl = () => {
    return this.redirectedUrl
  }
}

let auth = new Auth()

export default auth
