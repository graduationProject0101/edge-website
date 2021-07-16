import { combineReducers } from 'redux'
import authedUser from './authedUser'
import items from './items'
import cart from './cart'

export default combineReducers({
    authedUser,
    items,
    cart
})