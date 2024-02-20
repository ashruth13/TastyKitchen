import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class NotFound extends Component {
  home = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="no-main">
        <img
          src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/qpj5pg7rypefklxb6vsh"
          alt="not-found"
          className="not-img"
        />
        <p className="not-head">Page Not Found</p>
        <p className="not-para">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>

        <button type="button" className="not-button" onClick={this.home}>
          Home Page
        </button>
      </div>
    )
  }
}

export default NotFound
