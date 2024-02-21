import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GrClose} from 'react-icons/gr'
import {IoMenuSharp} from 'react-icons/io5'
import Cookies from 'js-cookie'
import TastyKitchen from '../../context/TastyKitchen'
import './index.css'

class Header extends Component {
  state = {
    showDown: true,
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')
  }

  but = () => {
    this.setState(prevState => ({showDown: !prevState.showDown}))
  }

  render() {
    return (
      <TastyKitchen.Consumer>
        {value => {
          const {activeTabId, changeTabId} = value
          const {showDown} = this.state
          const change = activeId => {
            changeTabId(activeId)
          }
          return (
            <nav>
              <div className="head-main">
                <Link to="/" className="link">
                  <div className="head-name">
                    <img
                      className="head-img"
                      alt="website logo"
                      src="https://res.cloudinary.com/dh4d9iuty/image/upload/v1632986851/Tasty_Kitchen_lc3zjq.png"
                    />
                    <h1 className="head-head">Tasty Kitchens</h1>
                  </div>
                </Link>
                <ul className="large-view">
                  <Link to="/">
                    <li className="li">
                      <button
                        onClick={() => change('HOME')}
                        className={`noBtn ok ${
                          activeTabId === 'HOME' ? 'active' : ''
                        }`}
                        type="button"
                      >
                        Home
                      </button>
                    </li>
                  </Link>
                  <Link to="/cart">
                    <li className="li">
                      <button
                        onClick={() => change('CART')}
                        className={`noBtn ok ${
                          activeTabId === 'CART' ? 'active' : ''
                        }`}
                        type="button"
                      >
                        Cart
                      </button>
                    </li>
                  </Link>
                  <li className="li">
                    <button
                      className="noBtn butt"
                      type="button"
                      onClick={this.logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                <div className="io">
                  <button type="button" className="noBtn ko" onClick={this.but}>
                    {' '}
                    {showDown ? (
                      <IoMenuSharp size={20} />
                    ) : (
                      <GrClose size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className={`extra ${showDown ? 'dis' : 'sid'}`}>
                <Link to="/">
                  <button
                    onClick={() => change('HOME')}
                    className={`noBtn ok ${
                      activeTabId === 'HOME' ? 'active' : ''
                    }`}
                    type="button"
                  >
                    Home
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    onClick={() => change('CART')}
                    className={`noBtn ok ${
                      activeTabId === 'CART' ? 'active' : ''
                    }`}
                    type="button"
                  >
                    Cart
                  </button>
                </Link>
                <button
                  onClick={this.logout}
                  className="noBtn butt"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </nav>
          )
        }}
      </TastyKitchen.Consumer>
    )
  }
}

export default withRouter(Header)
