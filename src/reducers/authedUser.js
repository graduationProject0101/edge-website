import { AUTHED_USER } from '../actions/authedUser'

export default function authedUser (state= null, action) {
    if (action.type === AUTHED_USER) {
        console.log("authed",action)
        return action.id;
    }
    return state
}