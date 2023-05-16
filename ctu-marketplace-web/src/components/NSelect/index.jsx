import React from "react"
import clsx from "clsx"
import styles from "./NSelect.module.css"

const NSelect = ({ classByParent, children, setValue }) => {
    return (
        <select className={clsx(styles.select, classByParent)} onChange={(e) => setValue(e.target.value)}>
            {children}
        </select>
    )
}

export default NSelect