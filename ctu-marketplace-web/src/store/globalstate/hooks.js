import Context from "./Context"
import { useContext } from "react"

const useStore = () => {
    return useContext(Context)
}

export {useStore}
