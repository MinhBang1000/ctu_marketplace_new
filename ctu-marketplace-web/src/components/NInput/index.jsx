import React, { useState } from "react"
import clsx from "clsx"
import styles from "./NInput.module.css"

const NInput = ({ classByParent, placeholder, setValue, value, type}) => {
    const [toggle, setToggle] = useState(false)

    return (<>
        {
            type === 'password' ? <div className={clsx(styles.password)}>
                <input className={clsx(styles.input, classByParent)}
                    onChange={(e) => setValue(e.target.value)}
                    type={toggle ? 'text' : 'password'}
                    value={value}
                    placeholder={placeholder}
                />
                <i className={clsx(styles.toggle,`fa-solid fa-${ toggle ? 'eye-slash' : 'eye'}`)} onClick={() => setToggle(!toggle)}></i>
            </div> : <input className={clsx(styles.input, classByParent)}
                    onChange={(e) => setValue(e.target.value)}
                    type={type ? type : 'text'}
                    value={value}
                    placeholder={placeholder}
                />
        }

    </>)
}

export default NInput