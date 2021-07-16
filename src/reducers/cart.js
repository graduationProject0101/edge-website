import { RECEIVE_CART, RECEIVE_CART_QTY, INCREASE_CART_QTY, DECREASE_CART_QTY } from '../actions/cart'
// import { ADD_TO_CART } from '../actions/cart'

export default function items (state= {}, action) {
    switch (action.type) {
        case RECEIVE_CART: 
            console.log("cart reducer", action.cart)
            return {
                ...state,
                ...action.cart,
                ...action.totalPrice
            };

        case RECEIVE_CART_QTY:
            return {
                ...state,
                ...action.cartQty
            }

        case INCREASE_CART_QTY: 
            return {
                ...state,
                ...action.cartQty + 1
            }
        
        case DECREASE_CART_QTY:
            return {
                ...state,
                ...action.cartQty + 1
            }

        // case ADD_TO_CART: 
        //     return {
        //         ...state,
        //         ...action.cart:
        //     };

        default:
            return state;
    }
}