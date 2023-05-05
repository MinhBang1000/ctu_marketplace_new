import {LOGIN, LOGOUT} from "./constraints" 

const initState = {
    logStatus: false,
    roleCode: ''
}

const reducer = (state, action) => {
    let newState
    switch (action.type) {
        case LOGIN: {
            const userData = JSON.parse(localStorage.getItem('userData'))
            let newRole = ''
            if (userData !== null) {
                newRole = userData.data.role.code
            }
            newState = {
                ...state, 
                logStatus: true,
                roleCode: newRole
            }
            break
        }
        case LOGOUT: {
            newState = {
                ...state,
                logStatus: false,
                roleCode: ''
            }
            break
        }
        default: {
            break
        }
    }
    return newState
}

export {initState}
export default reducer
