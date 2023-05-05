const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

// payload is boolean
// after login to setting global state
const myLogin = () => {
    return {
        type: LOGIN
    }
}

const myLogout = () => {
    return {
        type: LOGOUT 
    }
}

export {LOGIN, myLogin, myLogout, LOGOUT}