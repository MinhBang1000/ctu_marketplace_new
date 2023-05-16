import React from "react"
import clsx from "clsx"
import styles from "./NButton.module.css"

const NButton = ({children, classByParent ,clickFunc, btnType, formType}) => {
    return (<button className={clsx({
        [styles.btn]: true,
        [styles.btnPrimary]: btnType === "primary",
        [styles.btnGreen]: btnType === "success",
        [styles.btnRed]: btnType === "danger",
        [classByParent]: classByParent ? classByParent : ''
    })} onClick={() => clickFunc()} type={formType ? formType : "button"}>
        {children}
    </button>)
}

export default NButton