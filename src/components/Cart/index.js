import {Component} from 'react'
import {TiStarFullOutline} from 'react-icons/ti'
import PuffLoader from 'react-spinners/PuffLoader'
import {Link} from 'react-router-dom'
import Header from '../Header'
import TastyKitchen from '../../context/TastyKitchen'
import Counter from '../Counter'
import Footer from '../Footer'
import './index.css'
import CartItem from '../CartItem'

const apiStatus = {
  intital: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Cart extends Component {
  state = {
    items: '',
    status: apiStatus.loading,
  }

  componentDidMount() {
    this.getStorage()
  }

  getStorage = () => {
    this.setState({status: apiStatus.loading})
    const storage = JSON.parse(localStorage.getItem('cartList'))
    this.setState({status: apiStatus.success, items: storage})
  }

  onRefresh = () => {
    this.componentDidMount()
  }

  render() {
    return (
      <TastyKitchen.Consumer>
        {value => {
          const {activeTabId, changeTabId} = value
          const {items} = this.state
          console.log(items)
          if (activeTabId === 'HOME') {
            changeTabId('CART')
          }
          const home = () => {
            const {history} = this.props
            history.replace('/')
            changeTabId('HOME')
          }

          const placed = () => {
            localStorage.clear()
          }

          const renderItems = () => {
            const k = items.reduce(
              (sum, item) => sum + item.cost * item.quanity,
              0,
            )
            return (
              <div className="cart-main">
                <ul className="each-ul scroll">
                  {items.map(each => (
                    <CartItem info={each} onRefresh={this.onRefresh} />
                  ))}
                </ul>
                <hr />
                <div className="order-main">
                  <p className="order">Order Total : </p>
                  <p className="order">₹ {k}.00</p>
                </div>
                <div className="order-div">
                  <Link to="/payment">
                    <button
                      className="order-button"
                      type="button"
                      onClick={placed}
                    >
                      Place Order
                    </button>
                  </Link>
                </div>
              </div>
            )
          }
          const rendernoItems = () => (
            <div className="no-main">
              <img
                src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/xftjytatkhh0w0nv8nwl"
                alt="no-food"
                className="no-img"
              />
              <p className="no-head">No Orders Yet!</p>
              <p className="no-para">
                Your cart is empty. Add something from the menu.
              </p>
              <button className="no-button" type="button" onClick={home}>
                Order Now
              </button>
            </div>
          )

          const list =
            localStorage.getItem('cartList') === null ||
            JSON.parse(localStorage.getItem('cartList')).length === 0

          const renderChoice = () => {
            const k = ''
            return <div>{list ? rendernoItems() : renderItems()}</div>
          }

          const renderLoader = () => {
            const k = ''
            return (
              <div className="mid">
                <PuffLoader color="#f7931e" speedMultiplier={1} />
              </div>
            )
          }

          const decide = () => {
            const {status} = this.state
            console.log(status)
            switch (status) {
              case apiStatus.loading:
                return renderLoader()
              case apiStatus.success:
                return renderChoice()
              default:
                return ''
            }
          }

          const renderPayment = () => {
            const k = ''
            return (
              <div className="payment">
                <img
                  src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/kbd8yqnfsvi1dsaepum7"
                  alt="payment-done"
                />
                <p className="payment-head">Payment Successful</p>
                <p className="payment-body">
                  Thank you for ordering Your payment is successfully completed.
                </p>
                <button className="payment-button" type="button" onClick={home}>
                  Go To Home Page
                </button>
              </div>
            )
          }

          return (
            <div>
              <div>
                <Header high="CART" />
                {decide()}
              </div>
              <Footer />
            </div>
          )
        }}
      </TastyKitchen.Consumer>
    )
  }
}

export default Cart

// import {Component} from 'react'
// import CartItem from '../CartItem'

// class Cart extends Component {
//   state = {
//     itemsList: [],
//   }

//   componentDidMount() {
//     const itemsList = JSON.parse(localStorage.getItem('cartList'))
//     this.setState({itemsList})
//   }

//   render() {
//     const {itemsList} = this.state
//     console.log(itemsList)
//     return (
//       <div>
//         <ul className="cart-items-list">
//           lo p
//           {itemsList.map(e => (
//             <CartItem key={e.id} itemDetails={e} />
//           ))}
//           <hr className="cart-items-line" />
//         </ul>
//       </div>
//     )
//   }
// }

// export default Cart
