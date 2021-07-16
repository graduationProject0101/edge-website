import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { handleInitialData } from './actions/shared'
import { connect, useSelector } from 'react-redux'
import MainPage from './components/MainPage'
import ItemPage from './components/ItemPage'
import Cart from './components/Cart'
import SearchBar from './components/SearchBar'
import SignUp from './components/SignUp'
import Checkout from './components/Checkout'
import OrdersList from './components/Orderlistfr'
import SubCategory from './components/SubCategory'
import Profile from './components/Profile'
import WishList from './components/WishList'
import Admin from './components/Admin'
import AdminUsers from './components/AdminUsers'
import AdminProducts from './components/AdminProducts'
import AdminOrders from './components/AdminOrders'
import AdminUserOrders from './components/AdminUserOrders'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { setAuthedUser } from './actions/authedUser'
import Axios from 'axios'
// import Item from './components/Item'


function App(props) {

  const history = useHistory()

  const [userRole, setUserRole] = useState()

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const items = await props.handleInitialData()
  //     console.log('items fetched', items)
  //     return {items}
  //   }

  //   fetchItems()
  // },[])

  useEffect(() => {
    const autoLogin = async () => {
      const userToken = await localStorage.getItem('token')
      if (!userToken) {
          return false
      }

      const currentTime = await Date.now() / 1000

      if (currentTime > jwt_decode(userToken).exp) {
          return false
      }

      const userId = await jwt_decode(userToken).id
      await props.setAuthedUser(userId)
      // const responseUserData = Axios.get(`api/v1/users/getuser?_id=${userId}`)
      // console.log("🚀 ~ file: App.js ~ line 58 ~ autoLogin ~ responseUserData", responseUserData)
      // const data = await responseUserData.then(res => res.data.data[0])
      // console.log("🚀 ~ file: App.js ~ line 60 ~ autoLogin ~ data", data)
      const role = await localStorage.getItem('userRole')
      if (role === 'admin') {
        history.push("/admin")
      }

      console.log("🚀 ~ file: App.js ~ line 62 ~ autoLogin ~ role", role)
      setUserRole(role)
      console.log('user-role', userRole)

      return true
    }

    autoLogin()
  }, [])

  const authedUser = useSelector(state => state.authedUser)

  return (
    <Router>
      <div className="App">
        {authedUser === null ? (
          <Route to='/signup' component={ SignUp } />
        ) : (
          <div>
            <Route exact path='/' component={ MainPage }/>
            <Route path='/item/:id' component={ ItemPage }/>
            <Route path='/cart' component={ Cart }/>
            <Route path='/search' component={ SearchBar }/>
            {/* <Route path='/signup' component={ SignUp } /> */}
            <Route path='/checkout' component={ Checkout } />
            <Route path='/orders' component={OrdersList} />
            <Route path='/category/:subcategory' component={ SubCategory } />
            <Route path='/profile' component={ Profile } />
            <Route path='/wishlist' component={ WishList } />
            <Route exact path='/admin' component={ Admin } />
            <Route path='/admin/users' component={ AdminUsers } />
            <Route path='/admin/products' component={ AdminProducts } />
            <Route exact path='/admin/orders' component={ AdminOrders } />
            <Route path='/admin/orders/:name/:id' component={ AdminUserOrders } />
          </div>
        )}
      </div>
    </Router>
  );
}

// function mapStateToProps ({items}) {
//   console.log('items App', items)
//   return {
//     items
//   }
// }

function mapDispatchToProps (dispatch) {
  return {
    setAuthedUser: (data) => dispatch(setAuthedUser(data))
  }
}

export default connect(null, mapDispatchToProps)(App);