
import React from "react"
import clsx from "clsx"
import styles from "./Toast.module.css"
import { useEffect } from "react"

const Toast = ({title, message, status, changeToast}) => {

    
    const SuccessToast = () => {
        return (
            <div className={clsx(styles.toast, styles.success)}>
                <i className="fa-solid fa-xmark" onClick={() => changeToast(0)}></i>
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <div className={clsx(styles.title)}>{title}</div>
                <div className={clsx(styles.message)}>{message}</div>
            </div>
        )
    }

    const FailToast = () => {
        return (
            <div className={clsx(styles.toast, styles.fail)}>
                <i className="fa-solid fa-xmark" onClick={() => changeToast(0)}></i>
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div className={clsx(styles.title)}>{title}</div>
                <div className={clsx(styles.message)}>{message}</div>
            </div>
        )
    }

    useEffect(() => {
        setTimeout(() => {
            changeToast(0)
        }, 3600)
    }, [])
    
    return (
        <>
            {
                status===true ? SuccessToast() : FailToast()
            }
        </>
    )

}


export default Toast 