export const RECEIVE_CART = 'RECEIVE_CART'
export const RECEIVE_CART_QTY = 'RECEIVE_CART_QTY'
export const INCREASE_CART_QTY = 'INCREASE_CART_QTY'
export const DECREASE_CART_QTY = 'DECREASE_CART_QTY'
export const ADD_TO_CART = 'ADD_TO_CART'

export function getcart (cart, totalPrice) {
    return {
        type: RECEIVE_CART,
        cart,
        totalPrice
    }
}

export function getCartQty (cartQty) {
    return {
        type: RECEIVE_CART_QTY,
        cartQty
    }
}

export function increaseCartQty () {
    return {
        type: RECEIVE_CART_QTY
    }
}

export function decreaseCartQty () {
    return {
        type: RECEIVE_CART_QTY
    }
}

export function addToCart (cartItem) {
    return {
        type: ADD_TO_CART,
        cartItem
    }
};