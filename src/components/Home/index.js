import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Popup from 'react-customizable-popup'
import {Link} from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import {BsFilterLeft, BsCaretDownFill} from 'react-icons/bs'
import {TiStarFullOutline} from 'react-icons/ti'
import {
  MdOutlineDone,
  MdOutlineSort,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from 'react-icons/md'
import {IoMdArrowDropdown, IoIosSearch} from 'react-icons/io'
import TastyKitchen from '../../context/TastyKitchen'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiCarosel = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
}

const apiRest = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    activePage: 1,
    inp: '',
    seinp: '',
    sort: 'Lowest',
    restaurantData: [],
    carouselImages: [],
    caroselStatus: apiCarosel.initial,
    restStatus: apiRest.initial,
    error: '',
  }

  componentDidMount() {
    this.getDetails()
    this.getRest()
  }

  inpu = event => {
    this.setState({inp: event.target.value})
  }

  clicked = () => {
    const {inp} = this.state
    this.setState({seinp: inp}, this.getRest)
  }

  getRest = async () => {
    this.setState({restStatus: apiRest.loading})
    const Token = Cookies.get('jwt_token')
    const {seinp, sort, activePage} = this.state
    const limit = 10
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${seinp}&sort_by_rating=${sort}&offset=${offset}&limit=${limit}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const newData = data.restaurants.map(each => ({
        costOfTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      }))
      this.setState({restaurantData: newData, restStatus: apiRest.success})
    } else {
      this.setState({restStatus: apiRest.failure})
    }
  }

  getDetails = async () => {
    this.setState({caroselStatus: apiCarosel.loading})
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updated = data.offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({carouselImages: [updated]})
    if (response.ok) {
      this.setState({caroselStatus: apiCarosel.success})
    }
  }

  high = () => {
    this.setState({sort: 'Highest'}, this.getRest)
  }

  low = () => {
    this.setState({sort: 'Lowest'}, this.getRest)
  }

  renderRest = () => {
    const {restaurantData, sort, inp} = this.state
    let empty = false
    if (restaurantData.length === 0) {
      empty = true
    }

    return (
      <div className="container">
        <h1 className="popular-heading">Popular Restaurants</h1>
        <p className="popular-p">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="parentItem">
          <div className="search-div">
            <input
              onChange={this.inpu}
              value={inp}
              type="search"
              className="item-input"
              placeholder="Search"
            />
            <button type="button" className="noBtn" onClick={this.clicked}>
              {' '}
              <IoIosSearch size={20} />
            </button>
          </div>
          <div>
            <Popup
              arrow={false}
              toggler={
                <div className="span-p">
                  <MdOutlineSort size={25} color="#475569" />
                  <p className="span">Sort by</p>
                  <button className="noBtn" type="button">
                    {'  '}
                    <IoMdArrowDropdown size={25} color="#475569" />
                  </button>
                </div>
              }
            >
              <div className="filter-popup">
                <button type="button" className="noBtn" onClick={this.high}>
                  <div
                    className={
                      sort === 'Highest' ? 'activeColor' : 'passiveColor'
                    }
                  >
                    <h3
                      onClick={this.onLowest}
                      className={
                        sort === 'Highest' ? 'optionsActive' : 'optionsPassive'
                      }
                    >
                      Highest
                    </h3>
                    <MdOutlineDone
                      className={sort === 'Highest' ? '' : 'None'}
                    />
                  </div>
                </button>
                <button type="button" className="noBtn" onClick={this.low}>
                  <div
                    className={
                      sort === 'Lowest' ? 'activeColor' : 'passiveColor'
                    }
                  >
                    <h3
                      onClick={this.onHighest}
                      className={
                        sort === 'Lowest' ? 'optionsActive' : 'optionsPassive'
                      }
                    >
                      Lowest
                    </h3>
                    <MdOutlineDone
                      className={sort === 'Lowest' ? '' : 'None'}
                    />
                  </div>
                </button>
              </div>
            </Popup>
          </div>
        </div>
        {empty === true ? (
          <div className="cent">
            <p className="error">No more restaurants left</p>
          </div>
        ) : (
          <ul className="ul wrap">
            {restaurantData.map(each => (
              <li className="item wrap-adjust">
                <div>
                  <Link to={`/restaurants/${each.id}`} className="link">
                    <div className="item">
                      <div>
                        <img
                          src={each.imageUrl}
                          alt={each.id}
                          className="item-image"
                        />
                      </div>
                      <div className="sub-item">
                        <p className="item-head ul">{each.name}</p>
                        <p className="item-p ull">{each.cuisine}</p>
                        <div className="item-div">
                          <TiStarFullOutline color="#FFCC00" size={16} />
                          <p className="item-rate">{each.rating}</p>
                          <p className="item-rating">
                            ({each.totalReviews} ratings)
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  caroselDecide = () => {
    const {caroselStatus} = this.state
    switch (caroselStatus) {
      case apiCarosel.loading:
        return this.renderLoading()
      case apiCarosel.success:
        return this.renderCarosel()
      default:
        return ''
    }
  }

  renderRestFailure = () => {
    const {inp, seinp} = this.state
    return (
      <div className="container">
        <h1 className="popular-heading">Popular Restaurants</h1>
        <p className="popular-p">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="parentItem">
          <div className="search-div">
            <input
              onChange={this.inpu}
              value={inp}
              type="search"
              className="item-input"
              placeholder="Search"
            />
            <button type="button" className="noBtn" onClick={this.clicked}>
              {' '}
              <IoIosSearch size={20} />
            </button>
          </div>

          <div className="span-p">
            <MdOutlineSort size={25} color="#475569" />
            <p className="span">Sort by</p>
            <button className="noBtn" type="button">
              {'  '}
              <IoMdArrowDropdown size={25} color="#475569" />
            </button>
          </div>
        </div>
        <div className="cent">
          <p className="error">We couldn't find any results for "{seinp}"</p>
        </div>
      </div>
    )
  }

  renderj = () => <div>lop</div>

  restDecide = () => {
    const {restStatus} = this.state
    switch (restStatus) {
      case apiRest.loading:
        return this.renderLoading()
      case apiRest.success:
        return this.renderRest()
      case apiRest.failure:
        return this.renderRestFailure()
      default:
        return ''
    }
  }

  renderLoading = () => {
    const k = ''
    return (
      <div className="mid">
        <PuffLoader color="#f7931e" speedMultiplier={1} />
      </div>
    )
  }

  renderCarosel = () => {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: 'linear',
      arrows: false,
    }
    const {carouselImages} = this.state
    const carImages = carouselImages[0]
    return (
      <div className="carousel-box">
        <Slider {...settings}>
          {carImages.map(e => (
            <div>
              <img
                src={e.imageUrl}
                key={e.id}
                alt={e.id}
                className="carousel-img"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  increase = () => {
    this.setState(
      prevState => ({activePage: prevState.activePage + 1}),
      this.getRest,
    )
  }

  decrease = () => {
    const {activePage} = this.state
    if (activePage === 0) {
      return ''
    }
    this.setState(
      prevState => ({activePage: prevState.activePage - 1}),
      this.getRest,
    )
    return ''
  }

  render() {
    return (
      <TastyKitchen.Consumer>
        {value => {
          const {activeTabId, changeTabId} = value
          const {activePage, restaurantData} = this.state
          if (activeTabId === 'CART') {
            changeTabId('HOME')
          }
          let empty = false
          if (restaurantData.length === 0) {
            empty = true
          }
          return (
            <div className="main-main">
              <Header />

              <div className="poi">
                <div>{this.caroselDecide()}</div>
                <div>{this.restDecide()}</div>
              </div>

              <div className="center-button">
                <button className="noBtn" type="button" onClick={this.decrease}>
                  {' '}
                  <MdOutlineKeyboardArrowLeft className="outline" size={25} />
                </button>
                <p>{activePage}</p>
                <button className="noBtn" type="button">
                  {' '}
                  <MdOutlineKeyboardArrowRight
                    className="outline"
                    size={25}
                    onClick={this.increase}
                  />
                </button>
              </div>
              <Footer />
            </div>
          )
        }}
      </TastyKitchen.Consumer>
    )
  }
}

export default Home
