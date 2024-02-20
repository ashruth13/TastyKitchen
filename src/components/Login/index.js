import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    error: '',
  }

  pass = event => {
    this.setState({password: event.target.value})
  }

  user = event => {
    this.setState({username: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  failure = error => {
    this.setState({isError: true, error})
  }

  sub = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main">
        <div>
          <img
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
            className="mob-login-img"
            alt=""
          />
        </div>
        <div className="form-p">
          <form onSubmit={this.sub} className="login-form">
            <div className="login-p-heading">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632986851/Tasty_Kitchen_lc3zjq.png"
              />
              <h1 className="login-p">Tasty Kitchens</h1>
            </div>
            <div className="login-hp">
              <h1 className="login-h">Login</h1>
            </div>
            <div className="label-div">
              <label className="login-label" htmlFor="first">
                USERNAME
              </label>
              <br />
              <input
                id="first"
                className="login-input"
                type="text"
                onChange={this.user}
                value={username}
              />
              <br />
            </div>
            <div className="label-div">
              <label className="login-label" htmlFor="second">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                onChange={this.pass}
                type="password"
                id="second"
                className="login-input"
              />
              <br />
              {isError ? <p className="login-error">{error}</p> : ''}
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="login-two">
          <img
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
            className="two"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Login
