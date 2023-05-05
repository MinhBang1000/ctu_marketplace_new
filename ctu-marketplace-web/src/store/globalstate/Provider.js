import Context from "./Context"
import { useReducer } from "react"
import reducer, { initState } from "./reducer"

const Provider = ({children}) => {
    const [state, myDispatch] = useReducer(reducer, initState)

    return (<Context.Provider value={[state, myDispatch]}>
        {children}
    </Context.Provider>)
}

export default Provider