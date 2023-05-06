import React, { useEffect } from "react"
import clsx from "clsx"
import styles from "./NNavbar.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useStore, myLogout, myLogin } from "../../store/globalstate"

const NNavbar = () => {
    // Init Data
    const roles = ["NNC", "SAD", "AD"]
    const initState = {
        showNavbar: true
    }
    // Hooks
    const [localState, setState] = useState(initState)
    const {showNavbar} = localState
    const [state, myDispatch] = useStore()
    const {logStatus, roleCode} = state
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) 
        if (userData !== null) {
            myDispatch(myLogin())
        }
    }, [])
    // Handle
    const handleLogout = () => {
        localStorage.clear()
        // dispatch logout here
        myDispatch(myLogout())
    }
    const handleShowHide = (value) => {
        setState((prev) => {
            return {...prev, showNavbar: value}
        })
    }
    // Sub-Components
    const mobileNavbar = () => {
        return (<div className={clsx(styles.mnavbar)}>
            <div className={clsx(styles.mmenu)}>
                <div className={clsx(styles.mbrand)}>
                    <Link to="/">
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/0305-logo-ctu.png`}
                            alt="Logo"
                        />
                        <h3>CTU Market Place</h3>
                    </Link>
                </div>
                <i className={clsx(styles.open,styles.toggle, `fa-solid fa-bars`)}
                    onClick={() => handleShowHide(true)}
                ></i>
            </div>
            <div className={clsx({
                [styles.mlist]: true,
                [styles.show]: showNavbar,
                [styles.hide]: !showNavbar
            })}>
                <div className={clsx(styles.mtitle)}>
                    <i className={clsx(styles.close,styles.toggle, `fa-solid fa-xmark`)}
                        onClick={() => handleShowHide(false)}
                    ></i>
                    <h3>CTU Market Place</h3>
                </div>
                <Link className={clsx(styles.mitem)} to="/"
                    onClick={() => handleShowHide(false)}
                >
                    <i className="fa-solid fa-house"></i> Trang chủ
                </Link>
                {
                    roles.includes(roleCode) && logStatus ? <Link className={clsx(styles.mitem)} to="/projects"
                        onClick={() => handleShowHide(false)}
                    >
                        <i className="fa-solid fa-microscope"></i> Dự án
                    </Link> : ''
                }
                <Link className={clsx(styles.mitem)} to="/introduction"
                    onClick={() => handleShowHide(false)}
                >
                    <i className="fa-solid fa-circle-info"></i> Giới thiệu
                </Link>
                <Link className={clsx(styles.mitem)} to="/contact"
                    onClick={() => handleShowHide(false)}
                >
                    <i className="fa-solid fa-phone"></i> Liên hệ
                </Link>
                {
                    logStatus===true ? <Link className={clsx(styles.mitem)} to="/"
                            onClick={() => {
                                handleShowHide(false)
                                handleLogout()
                            }}
                        >
                            <i className="fa-solid fa-arrow-left"></i> Đăng xuất
                        </Link> : <>
                            <Link className={clsx(styles.mitem)} to="/login"
                                onClick={() => handleShowHide(false)}
                            >
                                <i className="fa-solid fa-arrow-right"></i> Đăng nhập
                            </Link>
                            
                            {/* <Link className={clsx(styles.mitem)} to="/register"
                                onClick={() => handleShowHide(false)}
                            >
                                <i className="fa-solid fa-person"></i> Đăng ký
                            </Link> */}
                        </>
                }

            </div>
            <div className={clsx({
                [styles.cover]: true,
                [styles.show]: showNavbar,
                [styles.hide]: !showNavbar
            })}>
                
            </div>
        </div>)
    } 
    const desktopNavbar = () => {
        return (<div className={clsx(styles.navbar)}>
        <div className={clsx(styles.list)}>
            <div className={clsx(styles.brand)}>
                <Link to="/">
                    <img 
                        src={`${process.env.PUBLIC_URL}/images/0305-logo-ctu.png`}
                        alt="Logo"
                    />
                    <h3>CTU Market Place</h3>
                </Link>
            </div>
            <Link className={clsx(styles.item)} to="/">
                Trang chủ
            </Link>
            {
                roles.includes(roleCode) && logStatus ? <Link className={clsx(styles.item)} to="/projects">
                    Dự án
                </Link> : ''
            }
            <Link className={clsx(styles.item)} to="/introduction">
                Giới thiệu
            </Link>
            <Link className={clsx(styles.item)} to="/contact">
                Liên hệ
            </Link>
            {
                logStatus===true ? <Link className={clsx(styles.item)} to="/"
                        onClick={() => handleLogout()}
                    >
                        Đăng xuất
                    </Link> : <>
                        <Link className={clsx(styles.item)} to="/login">
                            Đăng nhập
                        </Link>

                        {/* <Link className={clsx(styles.item)} to="/register">
                            Đăng ký
                        </Link> */}
                    </>
            }

        </div>
    </div>)
    }
    // Render
    return (<>
        {desktopNavbar()}
        {mobileNavbar()}
    </>
    )
}

export default NNavbar