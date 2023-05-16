import React from "react"
import clsx from "clsx"
import styles from "./NInput.module.css"

const NInput = ({ classByParent, placeholder, setValue, value}) => {
    return (<input className={clsx(styles.input, classByParent)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
    />)
}

export default NInput