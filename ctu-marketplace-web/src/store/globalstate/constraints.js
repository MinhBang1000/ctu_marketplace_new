const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const SET_PROJECT = "SPR"
const RE_CHECK_AUTH = "RECHECKAUTH"
const RE_LOAD = "RELOAD"

// payload is boolean
// after login to setting global state
const reCheckAuth = () => {
    return {
        type: RE_CHECK_AUTH
    }
}

const reLoad = () => {
    return {
        type: RE_LOAD
    }
}

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

export {LOGIN, myLogin, myLogout, setProject,SET_PROJECT, LOGOUT, RE_CHECK_AUTH, reCheckAuth, RE_LOAD, reLoad}