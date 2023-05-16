import React from "react"
import clsx from "clsx"
import styles from "./NSearch.module.css"

const NSearch = ({ classByParent, placeholder, value, setValue }) => {
    return (
        <div className={clsx(styles.search, classByParent)}>
            <input 
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
    )
}

export default NSearch