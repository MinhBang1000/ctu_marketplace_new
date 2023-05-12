import React from "react"

const NValid = ({text, isValid}) => {
    return (<div className={isValid ? `valid-feedback` : `invalid-feedback`}>
        {text}
    </div>)
}

export default NValid