import React from "react"

const NFeedback = ({children, check}) => {
    return (<div class={check?'valid-feedback':'invalid-feedback'}>
        {children}
    </div>)
}

export default NFeedback