import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const apiUrl = 'https://apis.ccbp.in/login'

const Login = props => {
  const {history} = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const handleLogin = async event => {
    event.preventDefault()

    setErrorMessage('')
    setIsLoading(true)

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        setErrorMessage(data.error_msg)
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-restaurant-name">UNI Resto Cafe</h1>

        <h2 className="login-heading">Welcome Back!</h2>

        <label className="login-label" htmlFor="username">
          Username
        </label>

        <input
          id="username"
          type="text"
          className="login-input"
          placeholder="Enter your username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />

        <label className="login-label" htmlFor="password">
          Password
        </label>

        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {errorMessage !== '' && <p className="login-error">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login
