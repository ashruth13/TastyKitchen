import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

class Payment extends Component {
  home = () => {
    const {history} = this.props
    return history.replace('/')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="payment">
          <img
            src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/kbd8yqnfsvi1dsaepum7"
            alt="payment-done"
          />
          <p className="payment-head">Payment Successful</p>
          <p className="payment-body">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <button className="payment-button" type="button" onClick={this.home}>
            Go To Home Page
          </button>
        </div>
      </div>
    )
  }
}

export default Payment
