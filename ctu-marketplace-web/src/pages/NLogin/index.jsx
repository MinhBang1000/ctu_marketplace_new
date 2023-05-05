import React from "react"
import clsx from "clsx"
import styles from "./NLogin.module.css"
import { useState } from "react"

const NLogin = () => {
    // Init hooks
    const initState = {
        username: "",
        password: ""
    }
    const [localState, setState] = useState(initState)
    const {username, password} = localState
    // Handle
    const handleSetUsername = (value) => {
        setState((prev) => {
            return {...prev, username: value}
        })
    }
    const handleSetPassword = (value) => {
        setState((prev) => {
            return {...prev, password: value}
        })
    }
    // Rendering
    return (<div className={clsx(styles.auth)}  style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/my_auth_background.jpg')`}}>
        <div className={clsx(styles.info)}>
            
        </div>
        <div className={clsx(styles.content)}>
            <h1 className={clsx(styles.title)}>Đăng nhập</h1>
            <div className={clsx(styles.formGroup)}>
                <label>Tên đăng nhập</label>
                <input placeholder="alexvu@com ..." value={username} type="text" onChange={(e) => handleSetUsername(e.target.value)} />
            </div>
            <div className={clsx(styles.formGroup)}>
                <label>Mật khẩu</label>
                <input placeholder="*****" value={password} type="password" onChange={(e) => handleSetPassword(e.target.value)} />
            </div>
            <div className={clsx(styles.link, styles.forgot)}><span>Quên mật khẩu</span></div>
            <div className={clsx(styles.btn, styles.submit)}>Đăng nhập</div>
            {/* Google Login Here */}
            <div className={clsx(styles.link, styles.signup)}><span>Bạn chưa có tài khoản ?</span></div>
        </div>
    </div>)
}

export default NLogin