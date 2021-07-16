import { getItems } from './items'
import { getInitialData } from '../Api'


export const handleInitialData = () => async (dispatch) => {
    const {allItems} = await getInitialData()
    console.log('items shared', allItems)
    dispatch(getItems(allItems))
    return {allItems}
}


// export function handleInitialData() {
//     return dispatch => {
//         return getInitialData().then(({ items }) => {
//             console.log('items shared', items)
//             dispatch(getItems(items));
//             return {items}
//         });
//     };
// }