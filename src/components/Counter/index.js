import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    count: 1,
  }

  onIncrement = async () => {
    await this.setState(prevState => ({count: prevState.count + 1}))
    const {count} = this.state
    const {info} = this.props
    const storedData = JSON.parse(localStorage.getItem('cartList'))
    console.log(storedData)
    const newStoredData = storedData.map(each => {
      if (info.id === each.id) {
        return {...each, quanity: count}
      }
      return each
    })
    localStorage.setItem('cartList', JSON.stringify([...newStoredData]))
  }

  onDecrement = async () => {
    const {info} = this.props
    const {count} = this.state
    if (count === 0) {
      await this.setState({count: 0})
      return ''
    }
    await this.setState(prevState => ({count: prevState.count - 1}), this.decre)
    return ''
  }

  decre = () => {
    const {info} = this.props
    const {count} = this.state
    const storedData = JSON.parse(localStorage.getItem('cartList'))
    const newStoredData = storedData.map(each => {
      if (info.id === each.id) {
        if (count === 0) {
          return null
        }
        return {...each, quanity: count}
      }
      return each
    })

    const newSd = newStoredData.filter(each => each !== null)
    localStorage.setItem('cartList', JSON.stringify([...newSd]))
    console.log(localStorage.getItem('cartList'), count)
  }

  render() {
    const {count} = this.state
    return (
      <div className="counter-main">
        <button
          type="button"
          onClick={this.onDecrement}
          className="counter-btn"
        >
          -
        </button>
        <div className="mr">{count}</div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="counter-btn"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
