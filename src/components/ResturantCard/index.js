import {Component} from 'react'
import Cookies from 'js-cookie'
import {TiStarFullOutline} from 'react-icons/ti'
import PuffLoader from 'react-spinners/PuffLoader'
import Footer from '../Footer/index'
import Addbut from '../Addbut/index'
import Header from '../Header/index'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ResturantCard extends Component {
  state = {
    restData: [],
    status: apiConstant.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({status: apiConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updated = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        name: data.name,
        rating: data.rating,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
      }
      this.setState({restData: updated, status: apiConstant.success})
    } else {
      this.setState({status: apiConstant.failure})
    }
  }

  renderLoading = () => (
    <div className="po">
      <PuffLoader color="#f7931e" speedMultiplier={1} />
    </div>
  )

  add = () => {}

  renderSuccess = () => {
    const {restData} = this.state
    const {foodItems} = restData
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }
    return (
      <ul className="each-ul">
        {foodItems.map(each => (
          <li className="each-li">
            <img src={each.imageUrl} alt={each.id} className="each-img" />
            <div className="each-two">
              <p className="each-name">{each.name}</p>
              <p className="each-price">₹ {each.cost}</p>
              <div className="rest-f2">
                <TiStarFullOutline color="#f7931e" size={16} />
                <p className="each-rating"> {each.rating}</p>
              </div>
              <Addbut info={each} />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderDecide = () => {
    const {status} = this.state
    switch (status) {
      case apiConstant.success:
        return this.renderSuccess()
      case apiConstant.failure:
        return ''
      case apiConstant.loading:
        return this.renderLoading()
      default:
        return ''
    }
  }

  render() {
    const {restData} = this.state
    return (
      <div>
        <div>
          <Header />
          <div className="banner">
            <img
              src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/clqyv8kzetpbwa2sjbtt"
              className="rest-img"
              alt="rest-alt"
            />
            <div className="rest-card">
              <p className="rest-name">{restData.name}</p>
              <p className="rest-cuisine">{restData.cuisine}</p>
              <p className="rest-cuisine">{restData.location}</p>
              <div className="rest-f1">
                <div className="rest-f3">
                  <div className="rest-f2">
                    <TiStarFullOutline color="#ffffff" size={16} />
                    <p className="rest-p"> {restData.rating}</p>
                  </div>

                  <p className="rest-count">{restData.reviewsCount}+ Ratings</p>
                </div>
                <div className="rest-end">
                  <p className="rest-cuisine">₹ {restData.costForTwo}</p>
                  <p className="rest-cuisine">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <div>{this.renderDecide()}</div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default ResturantCard
