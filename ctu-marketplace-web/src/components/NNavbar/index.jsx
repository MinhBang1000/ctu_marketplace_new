import React, { useEffect } from "react"
import clsx from "clsx"
import styles from "./NNavbar.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useStore, myLogout, myLogin, reLoad } from "../../store/globalstate"
import { useTransition, animated } from "@react-spring/web"

const NNavbar = () => {
    // Init Data
    const roles = ["NNC", "SAD", "AD"]
    const admin = ["SAD", "AD"]
    const initState = {
        showNavbar: false,
        showAccount: false,
        firstRender: false,
        userInformations: null,
    }
    // Hooks
    const [localState, setState] = useState(initState)
    const {showNavbar, showAccount, userInformations} = localState
    const [state, myDispatch] = useStore()
    const {logStatus, roleCode, reCheckAuth, firstRender} = state
    const navbarTransitions = useTransition(showNavbar, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })
    const accountTransitions = useTransition(showAccount, {
        from: { opacity: 0 },
        enter: { opacity: 1 }
    })
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) 
        if (userData !== null) {
            myDispatch(myLogin())
            setState((prev) => {
                return {...prev, userInformations: userData.data}
            })
        }
    }, [reCheckAuth])
    useEffect(() =>{
        document.addEventListener('click', handleEffectToggle)
        return () => {
            document.removeEventListener('click', handleEffectToggle)
        }
    }, [showAccount])
    // Handle
    const handleEffectToggle = () => {
        if (showAccount) {
            setState((prev) => {
                return {...prev, showAccount: false}
            })
        }
    }
    const handleLogout = () => {
        localStorage.clear()
        // dispatch logout here
        myDispatch(myLogout())
    }
    const handleShowHide = (value) => {
        setState((prev) => {
            return {...prev, firstRender: true, showNavbar: value}
        })
        handleSetReload()
    }
    const handleToggle = () => {
        setState((prev) => {
            return {...prev, showAccount: !prev.showAccount}
        })
    }
    const handleSetReload = () => {
        // using later for all link click event
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
                        <h3>CTU Marketplace</h3>
                    </Link>
                </div>
                <i className={clsx(styles.open,styles.toggle, `fa-solid fa-bars`)}
                    onClick={() => handleShowHide(true)}
                ></i>
            </div>
            {
                navbarTransitions((style, item) => {
                    return <animated.div style={style}>
                        {item && mlist()}
                    </animated.div>
                })
            }

        </div>)
    } 
    const userAvatar = () => {
        // Check user of google or not through avatar
        if (userInformations && userInformations.avatar.substring(0,5) === "https") {
            return `${userInformations.avatar}`
        }
        return `${process.env.REACT_APP_BASE_URL}/api/v3/projects/view-image/${userInformations.avatar}`
    }
    const mlist = () => {
        return (
            <>
            <div
                // className={clsx({
                //     [styles.mlist]: true,
                //     [styles.show]: showNavbar,
                //     [styles.hide]:  !showNavbar
                // })}
                className={clsx(styles.mlist)}
            >
                {
                    logStatus ? <div className={clsx(styles.maccount)}>
                        {
                            !userInformations ?  <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}/> : userInformations.avatar ? <img src={userAvatar()}/> : <img src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}/> 
                        }
                        <div className={clsx(styles.maccountInfo)}>
                            <div className={clsx(styles.maccountName)}>{userInformations && userInformations.fullName}</div>
                            <div className={clsx(styles.maccountEmail)}>{userInformations && userInformations.email}</div>
                        </div>
                        <i className={clsx(styles.accountClose,styles.toggle, `fa-solid fa-xmark`)}
                            onClick={() => handleShowHide(false)}
                        ></i>
                    </div> : <div className={clsx(styles.mtitle)}>
                        <i className={clsx(styles.close,styles.toggle, `fa-solid fa-xmark`)}
                            onClick={() => handleShowHide(false)}
                        ></i>
                        <h3>CTU Marketplace</h3>
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/0305-logo-ctu.png`}
                            alt="Logo"
                        />
                    </div>
                }

                <Link className={clsx(styles.mitem)} to="/"
                    onClick={() => handleShowHide(false)}
                >
                    <i className="fa-solid fa-house"></i> Trang chủ
                </Link>
                {
                    admin.includes(roleCode) && logStatus ? <Link className={clsx(styles.mitem)} to="/administrator"
                        onClick={() => handleShowHide(false)}
                    >
                        <i className="fa-solid fa-lock"></i> Quản trị
                    </Link> : ''
                }
                {
                    !admin.includes(roleCode) && roles.includes(roleCode) && logStatus ? <Link className={clsx(styles.mitem)} to="/projects"
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
                    logStatus===true ? <>
                        <Link className={clsx(styles.mitem)} to="/account"
                            onClick={() => {
                                handleShowHide(false)
                            }}
                        >
                            <i className="fa-solid fa-user"></i> Tài khoản
                        </Link>
                        <Link className={clsx(styles.mitem)} to="/"
                            onClick={() => {
                                handleShowHide(false)
                                handleLogout()
                            }}
                        >
                            <i className="fa-solid fa-arrow-left"></i> Đăng xuất
                        </Link>
                    </> : <>
                            <Link className={clsx(styles.mitem)} to="/login"
                                onClick={() => handleShowHide(false)}
                            >
                                <i className="fa-solid fa-arrow-right"></i> Đăng nhập
                            </Link>
                        </>
                }
            </div>
            <div 
                // className={clsx({
                //     [styles.cover]: true,
                //     [styles.show]: showNavbar,
                //     [styles.hide]: !showNavbar
                // })}
                className={clsx(styles.cover)}
            >
            </div>
            </>
        )
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
                    <h3>CTU Marketplace</h3>
                </Link>
            </div>
            <Link className={clsx(styles.item)} to="/">
                <div onClick={handleSetReload}>Trang chủ</div>
            </Link>
            {
                admin.includes(roleCode) && logStatus ? <Link className={clsx(styles.item)} to="/administrator">
                    <div onClick={handleSetReload}>Quản trị</div>
                </Link> : ''
            }
            {
                !admin.includes(roleCode) && roles.includes(roleCode) && logStatus ? <Link className={clsx(styles.item)} to="/projects">
                    <div onClick={handleSetReload}>
                        Dự án
                    </div>
                </Link> : ''
            }
            <Link className={clsx(styles.item)} to="/introduction">
                <div onClick={handleSetReload}>Giới thiệu</div>
            </Link>
            <Link className={clsx(styles.item)} to="/contact">
                <div onClick={handleSetReload}>Liên hệ</div>
            </Link>
            {
                logStatus===true ? <div className={clsx(styles.account)}>
                {
                    !userInformations ?  <img  className={clsx(styles.accountAvatar)} src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}/> : userInformations.avatar ? <img  className={clsx(styles.accountAvatar)} src={userAvatar()}/> : <img  className={clsx(styles.accountAvatar)} src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}/> 
                }
                {/* <img className={clsx(styles.accountAvatar)} src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}/> */}
                <div className={clsx(styles.accountInfo)}>
                    <div className={clsx(styles.accountName)}>{userInformations && userInformations.fullName}</div>
                    <div className={clsx(styles.accountEmail)}>{userInformations && userInformations.email}</div>
                </div>
                    {
                        accountTransitions((style,item) => {
                            return <animated.div style={style}>
                                { item ? <>
                                    <i onClick={handleToggle} className={clsx(styles.accountToggle, `fa-solid fa-chevron-up`)}></i>
                                    <ul className={clsx(styles.accountDropdown)}>
                                        <Link to="/account"><li className={clsx(styles.accountItem)}><i className="fa-solid fa-user"></i>Tài khoản</li></Link>
                                        <Link to="/"><li className={clsx(styles.accountItem, styles.accountLogout)} onClick={handleLogout}><i className="fa-solid fa-power-off"></i>Đăng xuất</li></Link>
                                    </ul>
                                </>: <i onClick={handleToggle} className={clsx(styles.accountToggle, `fa-solid fa-chevron-down`)}></i> }
                            </animated.div>
                        })
                    }
                </div> : <>
                        <Link className={clsx(styles.item)} to="/login">
                            <div onClick={handleSetReload}>Đăng nhập</div>
                        </Link>
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