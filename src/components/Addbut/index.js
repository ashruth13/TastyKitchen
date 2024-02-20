import {Component} from 'react'
import './index.css'
import Counter from '../Counter/index'

class Addbut extends Component {
  state = {display: true}

  render() {
    const {info} = this.props
    const {display} = this.state
    const add = () => {
      this.setState({display: false})
      const storedData = JSON.parse(localStorage.getItem('cartList'))
      localStorage.setItem(
        'cartList',
        JSON.stringify([...storedData, {...info, quanity: 1}]),
      )
    }
    const cla = display ? '' : 'hide'
    const alc = display ? 'hide' : ''
    return (
      <div>
        <button type="button" className={`each-btn ${cla}`} onClick={add}>
          ADD
        </button>
        <div className={`${alc}`}>
          <Counter info={info} />
        </div>
      </div>
    )
  }
}

export default Addbut
