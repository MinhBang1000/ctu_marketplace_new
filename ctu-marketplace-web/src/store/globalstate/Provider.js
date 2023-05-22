import Context from "./Context"
import { useReducer, useState } from "react"
import reducer, { initState } from "./reducer"

const Provider = ({children}) => {
    const [state, myDispatch] = useReducer(reducer, initState);
    const [field, setField] = useState('abc');

    return (<Context.Provider value={[state, myDispatch, field, setField]}>
        {children}
    </Context.Provider>)
}

export default Provider