import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Cart from './components/Cart'
import Home from './components/Home'
import Payment from './components/Payment'
import TastyKitchen from './context/TastyKitchen'
import ResturantCard from './components/ResturantCard'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    activeTabId: 'HOME',
  }

  render() {
    const {activeTabId} = this.state
    const onChangeTab = value => {
      this.setState({activeTabId: value})
    }
    return (
      <TastyKitchen.Provider value={{activeTabId, changeTabId: onChangeTab}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurants/:id"
            component={ResturantCard}
          />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </TastyKitchen.Provider>
    )
  }
}

export default App

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]
