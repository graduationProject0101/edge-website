export const AUTHED_USER = 'AUTHED_USER'

export function setAuthedUser (id) {
    console.log("🚀 ~ file: authedUser.js ~ line 4 ~ setAuthedUser ~ id", id)
    return {
        type: AUTHED_USER,
        id
    }
}