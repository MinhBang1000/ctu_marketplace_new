import React from "react"
import clsx from "clsx"
import styles from "./NValid.module.css"

const NValid = ({text, isValid}) => {
    return (<div className={clsx(styles.validate ,isValid ? styles.valid : styles.invalid)}>
        {text}
    </div>)
}

export default NValid