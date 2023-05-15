import React from "react"
import clsx from "clsx"
import styles from "./NButton.module.css"

const NButton = ({children, clickFunc, btnType}) => {
    return (<button className={clsx({
        [styles.btn]: true,
        [styles.btnPrimary]: btnType === "primary",
        [styles.btnGreen]: btnType === "success",
        [styles.btnRed]: btnType === "danger",
    })} onClick={() => clickFunc()}>
        {children}
    </button>)
}

export default NButton