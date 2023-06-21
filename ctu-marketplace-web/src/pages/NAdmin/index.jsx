import React, { useState } from "react"
import clsx from "clsx"
import styles from "./NAdmin.module.css"
import { useTransition, animated } from "@react-spring/web"
import NAdminUser from "../NAdminUser"
import NAdminProject from "../NAdminProject"
import NAdminMangeIntroduction from "../Admin/NAdmin-Manage-Introduction/NAdminMangeIntroduction"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { useStore } from "../../store/globalstate"

const NAdmin = () => {
    // Data
    /**
     *  1 -> Project Management
     *  2 -> User Management
     */
    const initState = {
        pageType: 1, 
    }
    // Hooks
    const [localState, setState] = useState(initState)
    const [state, myDispatch] = useStore()
    const roles = ["SAD", "AD"]
    const {
        logStatus,
        roleCode
    } = state
    const {pageType} = localState
    const pageTransitions = useTransition(pageType, {
        from: { opacity: 0 },
        enter: { opacity: 1 }
    })
    // Handle
    const handleChangePage = (type) => {
        setState((prev) => {
            return {...prev, pageType: type}
        })
    }
    return (
        <>
            {
                !logStatus || !roles.includes(roleCode) ? <Redirect to="/"/> : ''
            }
            <div className={clsx(styles.admin)}>
                <div className={clsx(styles.sidebar, styles.adminPart)}>
                    <ul className={clsx(styles.list)}>
                        <li className={clsx({
                            [styles.item]: true,
                            [styles.focus]: pageType === 1
                        })} onClick={() => handleChangePage(1)}><i className="fa-solid fa-diagram-project"></i>Quản lý dự án</li>
                        <li className={clsx({
                            [styles.item] : true,
                            [styles.focus] : pageType === 2
                        })} onClick={() => handleChangePage(2)}><i className="fa-solid fa-users"></i>Quản lý người dùng</li>
                        <li className={clsx({
                            [styles.item] : true,
                            [styles.focus] : pageType === 3
                        })} onClick={() => handleChangePage(3)}><i class="fa-solid fa-grip-lines"></i>Quản lý trang giới thiệu</li>
                    </ul>
                </div>
                <div className={clsx(styles.workbar, styles.adminPart)}>
                    {
                        pageTransitions((style,item) => {
                            return <animated.div style={style}>
                                { item === 1 && <NAdminProject />}
                                { item === 2 && <NAdminUser />}
                                { item === 3 && <NAdminMangeIntroduction />}
                            </animated.div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default NAdmin 