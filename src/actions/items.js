export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'

export function getItems (items) {
    return {
        type: RECEIVE_ITEMS,
        items
    }
}