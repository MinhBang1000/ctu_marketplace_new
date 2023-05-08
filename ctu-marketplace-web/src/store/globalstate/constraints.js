const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const SET_PROJECT = "SPR"

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

// payload is whole object of project
const setProject = (payload) => {
    return {
        type: SET_PROJECT,
        payload
    }
}

export {LOGIN, myLogin, myLogout, setProject,SET_PROJECT, LOGOUT}