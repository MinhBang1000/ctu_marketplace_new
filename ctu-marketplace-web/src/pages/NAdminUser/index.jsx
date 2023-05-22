import React, { useEffect, useState } from "react"
import clsx from "clsx"
import styles from "./UserManager.module.css"
import axios from "axios"
import authHeader from "../../services/auth.header"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"
import NSearch from "../../components/NSearch"
import { useTransition, animated } from "@react-spring/web"
import NSelect from "../../components/NSelect"

const NAdminUser = () => {
    // Init
    const initState = {
        userSearch: '',
        userRoleList: [],
        userRole: 0,
        userStatus: 0,
        // data
        users: [],
        loading: false,
        // trick
        reCallApis: false
    }
    // Hooks
    const [state, setState] = useState(initState)
    const {
        userSearch, 
        loading, 
        users, 
        reCallApis,
        userRole, 
        userRoleList,
        userStatus
    } = state
    // Apis
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/role-management`, { headers: authHeader() })
        .then(res => {
            setState((prev) => {
                return {...prev, userRoleList: res.data.data}
            })
        }).catch(error => {
            console.log(error)
        })

    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/user-management/users/1`, { headers: authHeader() })
        .then(res => {
            let allOfUser = res.data.data
            if (userRole !== 0) {
                allOfUser = allOfUser.filter((user) => {
                    return user.role.id === userRole
                })
            }
            if (userStatus !== 0) {
                const check = userStatus === 1
                allOfUser = allOfUser.filter((user) => {
                    return user.isEnabled === check
                })
            }
            if (userSearch !== "") {
                allOfUser = allOfUser.filter((user) => {
                    return user.username.includes(userSearch)
                })
            }
            setState((prev) => {
                return {...prev, users: allOfUser}
            })
        }).catch(error => {
            console.log(error)
        }) 
    }, [reCallApis, userRole, userStatus, userSearch])
    // Handle
    const handleDenied = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/user-management/enable-user?userId=${id}&isEnabled=false`,null,{
            headers: authHeader()
        }).then(res => {
            Swal.fire({
                icon: "success",
                title: "Bỏ kích hoạt tài khoản",
                text: "Tài khoản đã được bỏ kích hoạt thành công !"
            })
            handleRecallApis()
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: "Bỏ kích hoạt tài khoản",
                text: "Tài khoản bỏ kích hoạt không thành công ! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
            })
        })
    }
    const handleApprove = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/user-management/enable-user?userId=${id}&isEnabled=true`,null,{
            headers: authHeader()
        }).then(res => {
            Swal.fire({
                icon: "success",
                title: "Kích hoạt tài khoản",
                text: "Tài khoản đã được kích hoạt thành công !"
            })
            handleRecallApis()
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: "Kích hoạt tài khoản",
                text: "Tài khoản kích hoạt không thành công ! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
            })
        })
    }
    const handleDelete = (username) => {
        Swal.fire({
            title: 'Xóa tài khoản',
            text: "Bạn có chắc muốn xóa tài khoản này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/user-management/delete-user?username=${username}`, {headers: authHeader() })
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Xóa tài khoản",
                        text: "Tài khoản đã được xóa thành công"
                    })
                    handleRecallApis()
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Xóa tài khoản",
                        text: "Không xóa được tài khoản này! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
                    })
                })
            }
          })
    }
    const handleRenderButton = (status, userId, username) => {
        return <div className={clsx(styles.control)}>
            {
                status ? <i onClick={() => handleDenied(userId)} className={clsx(styles.btn, styles.cellBtn, styles.denied,`fa-solid fa-xmark`, `bg-warning`)}></i> : <i onClick={() => handleApprove(userId)} className={clsx(styles.btn,styles.cellBtn, styles.approved,`fa-solid fa-check`,`bg-primary`, `text-white`)}></i>
            }
            <i onClick={() => handleDelete(username)} className={clsx(styles.btn, styles.cellBtn, styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
        </div>
    }
    const handleRecallApis = () => {
        setState((prev) => {
            return {...prev, reCallApis: !prev.reCallApis}
        })
    }
    const handleSetUserSearch = (value) => {
        setState((prev) => {
            return {...prev, userSearch: value}
        })
    }
    const handleSetUserRole = (value) => {
        setState((prev) => {
            return {...prev, userRole: parseInt(value)}
        })
    }
    const handleSetUserStatus = (value) => {
        setState((prev) => {
            return {...prev, userStatus: parseInt(value)}
        })
    }
    // DataTable defining
    const columns = [
        {
            name: "HỌ VÀ TÊN",
            selector: (row) => row.fullName,
        },
        {
            name: "TÊN ĐĂNG NHẬP",
            selector: (row) => row.username,
        },
        {
            name: "EMAIL",
            selector: (row) => row.email
        },
        {
            name: "TRẠNG THÁI",
            selector: (row) => row.isEnabled === true ? "Đã duyệt" : "Chưa duyệt"
        },
        {
            name: "VAI TRÒ",
            selector: (row) => row.role.name
        },
        {
            name: "THAO TÁC",
            selector: (row) => handleRenderButton(row.isEnabled, row.id, row.username)
        }
    ]
    // Sub-components
    const userListComponent = () => {
        return (
            <div className={clsx(styles.project)}>
                <div className={clsx(styles.board)}> 
                    <NSelect classByParent={styles.boardItem} setValue={handleSetUserStatus}>
                        <option value={0}>Tất cả trạng thái</option>
                        <option value={1}>Đã kích hoạt</option>
                        <option value={2}>Chưa kích hoạt</option>
                    </NSelect>
                    <NSelect classByParent={styles.boardItem} setValue={handleSetUserRole}>
                    <option value={0}>Tất cả vai trò</option>
                        {
                            userRoleList.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </NSelect>
                    <NSearch classByParent={styles.boardItem} placeholder={"Tìm kiếm theo tên đăng nhập ..."} value={userSearch} setValue={handleSetUserSearch}/>
                </div>
                <div className={clsx(styles.table)}>
                    <DataTable 
                        columns={columns}
                        noDataComponent="Chưa có tài khoản để hiển thị"
                        data={users}
                        progressPending={loading}
                        pagination
                    />
                </div>    
            </div>
        )
    }

    // Rendering
    return (<>
        {
            userListComponent()
        }
    </>)

}

export default NAdminUser