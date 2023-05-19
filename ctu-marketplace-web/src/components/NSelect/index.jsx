import React from "react"
import clsx from "clsx"
import styles from "./NSelect.module.css"

const NSelect = ({ classByParent, children, setValue, value }) => {
    return (
        <>
            {
                value ? <select className={clsx(styles.select, classByParent)} value={value} onChange={(e) => setValue(e.target.value)}>
                    {children}
                </select> : <select className={clsx(styles.select, classByParent)} onChange={(e) => setValue(e.target.value)}>
                    {children}
                </select>
            }
        </>
    )
}

export default NSelect