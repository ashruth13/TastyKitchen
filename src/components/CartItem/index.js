import {Component} from 'react'
import Counter from '../Counter'

class CartItem extends Component {
  state = {
    quanity: '',
  }

  componentDidMount() {
    const {info} = this.props
    this.setState({quanity: info.quanity})
  }

  onIncrement = async () => {
    await this.setState(prevState => ({quanity: prevState.quanity + 1}))
    const {quanity} = this.state
    const {info} = this.props
    const storedData = JSON.parse(localStorage.getItem('cartList'))
    const newStoredData = storedData.map(each => {
      if (info.id === each.id) {
        return {...each, quanity}
      }
      return each
    })
    await localStorage.setItem('cartList', JSON.stringify([...newStoredData]))
  }

  decre = async () => {
    const {info} = this.props
    const {quanity} = this.state
    const storedData = JSON.parse(localStorage.getItem('cartList'))
    const newStoredData = await storedData.map(each => {
      if (info.id === each.id) {
        if (quanity === 0) {
          return null
        }
        return {...each, quanity}
      }
      return each
    })

    const newSd = newStoredData.filter(each => each !== null)
    await localStorage.setItem('cartList', JSON.stringify([...newSd]))
  }

  onDecrement = async () => {
    const {info} = this.props
    const {quanity} = this.state
    if (quanity === 0) {
      await this.setState({count: 0})
      return ''
    }
    await this.setState(
      prevState => ({quanity: prevState.quanity - 1}),
      this.decre,
    )
    return ''
  }

  render() {
    const {info} = this.props
    const {quanity} = this.state
    return (
      <li className="each-li">
        <img src={info.imageUrl} alt={info.id} className="each-img" />
        <div className="each-two">
          <p className="each-name op">{info.name}</p>
          <div className="counter-main">
            <button
              type="button"
              onClick={this.onDecrement}
              className="counter-btn"
            >
              -
            </button>
            <div className="mr">{quanity}</div>
            <button
              type="button"
              onClick={this.onIncrement}
              className="counter-btn"
            >
              +
            </button>
          </div>
          <p className="cart-price">₹ {info.cost * quanity}</p>
        </div>
      </li>
    )
  }
}

export default CartItem
