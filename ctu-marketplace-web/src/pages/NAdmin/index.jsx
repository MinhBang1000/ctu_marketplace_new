import React, { useState } from "react"
import clsx from "clsx"
import styles from "./NAdmin.module.css"
import AdminManageDomain from "../Admin/Admin-Manage-Domain"
import AdminManageUser from "../Admin/Admin-Manage-User"
import AdminManageProject from "../Admin/Admin-Manage-Project"
import AdminField from "../Admin/Admin-Manage-Infomations/Admin-Field"
import NAdminField from "../NAdminField"


const NAdmin = () => {
    // Data
    const initState = {
        pageType: 2, //1 --> Admin thông tin, 2 --> Admin dự án, 3 --> Admin người dùng, 4 --> Admin miền
    }
    // Hooks
    const [localState, setState] = useState(initState)
    const {pageType} = localState
    // Handle
    const handleChangePage = (type) => {
        setState((prev) => {
            return {...prev, pageType: type}
        })
    }
    return (
        <div className={clsx(styles.admin)}>
            <div className={clsx(styles.sidebar, styles.adminPart)}>
                <ul className={clsx(styles.list)}>
                    {/* <li className={clsx(styles.item)} onClick={() => handleChangePage(1)}><i className="fa-solid fa-lightbulb"></i>Quản lý thông tin</li> */}
                    <li className={clsx(styles.item)} onClick={() => handleChangePage(2)}><i className="fa-solid fa-diagram-project"></i>Quản lý dự án</li>
                    <li className={clsx(styles.item)} onClick={() => handleChangePage(3)}><i className="fa-solid fa-users"></i>Quản lý người dùng</li>
                    {/* <li className={clsx(styles.item)} onClick={() => handleChangePage(4)}><i class="fa-solid fa-chart-area"></i>Quản lý miền</li> */}
                </ul>
            </div>
            <div className={clsx(styles.workbar, styles.adminPart)}>
                {/* {pageType === 1 && <NAdminField />} */}
                {pageType === 2 && <AdminManageProject />}
                {pageType === 3 && <AdminManageUser />}
                {/* {pageType === 4 && <AdminManageDomain />} */}
            </div>
        </div>
    )
}

export default NAdmin 