import React, { useEffect, useState } from "react"
import clsx from "clsx"
import styles from "./ProjectManager.module.css"
import axios from "axios"
import authHeader from "../../../services/auth.header"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"

const AdminManageProjectPage = () => {
    // Init
    const initState = {
        detail: false,
        detailProject: {},
        search: '',
        // data
        statuses: [],
        projects: [],
        loading: false,
    }
    // Hooks
    const [state, setState] = useState(initState)
    // Variables
    const {search, statuses, loading, projects, detail, detailProject} = state
    // Apis
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/status-management`, {
            headers: authHeader()
        }).then(res => {
            setState((prev) => {
                return {...prev, statuses: res.data.data}
            })
        }).catch(error => {
            console.log(error)
        }) 

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
        .then(res => {
            setState((prev) => {
                return {...prev, projects: res.data.data}
            })
        }).catch(error => {
            console.log(error)
        }) 

    }, [])
    // Handle
    const handleDenied = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/approve/${id}?TC=true`,null,{
            headers: authHeader()
        }).then(res => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
            .then(res => {
                setState((prev) => {
                    return {...prev, projects: res.data.data}
                })
            }).catch(error => {
                console.log(error)
            }) 
        }).catch(error => {
            console.log(error);
        })
    }
    const handleApprove = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/approve/${id}?DD=true`,null,{
            headers: authHeader()
        }).then(res => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
            .then(res => {
                setState((prev) => {
                    return {...prev, projects: res.data.data}
                })
            }).catch(error => {
                console.log(error)
            }) 
        }).catch(error => {
            console.log(error);
        })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Xóa dự án',
            text: "Bạn có chắc muốn xóa dự án này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${id}`,{
                    headers: authHeader()
                }).then(res => {
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
                    .then(res => {
                        Swal.fire({
                            icon: "success",
                            title: "Xóa dự án",
                            text: "Dự án đã được xóa thành công"
                        })
                        setState((prev) => {
                            return {...prev, projects: res.data.data}
                        })
                    }).catch(error => {
                        
                    }) 
                }).catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "Xóa dự án",
                        text: "Không xóa được dự án này! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
                    })
                })
            }
          })
        
    }
    const handleBack = () => {
        setState((prev) => {
            return {...prev, detail: false}
        })
    }
    const handleSearch = (value) => {
        setState((prev) => {
            return {...prev, search: value}
        })
    }
    const handleRenderButton = (status, projectId) => {
        if (status.code === "CD") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                    <i onClick={() => handleApprove(projectId)} className={clsx(styles.btn, styles.approved,`fa-solid fa-check`,`bg-primary`, `text-white`)}></i>
                    <i onClick={() => handleDenied(projectId)} className={clsx(styles.btn, styles.denied,`fa-solid fa-xmark`, `bg-warning`)}></i>
                </div>
            )
        }else if (status.code === "DD") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                    <i onClick={() => handleDenied(projectId)} className={clsx(styles.btn, styles.denied,`fa-solid fa-xmark`, `bg-warning`)}></i>
                </div>
            )
        }else if (status.code === "TC") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                    <i onClick={() => handleApprove(projectId)} className={clsx(styles.btn, styles.approved,`fa-solid fa-check`,`bg-primary`, `text-white`)}></i>
                </div>
            )
        }
    }
    // DataTable defining
    const columns = [
        {
            name: "TÊN",
            selector: (row) => row.name,
        },
        {
            name: "NGƯỜI TẠO",
            selector: (row) => row.user.username,
        },
        {
            name: "TRẠNG THÁI",
            selector: (row) => row.status.name
        },
        {
            name: "LOẠI HÌNH",
            selector: (row) => row.template === true ? "Mẫu" : "Báo cáo"
        },
        {
            name: "THAO TÁC",
            selector: (row) => handleRenderButton(row.status, row.id)
        }
    ]
    const detailPage = (id) => {
        const item = projects.filter((item) => {
            return item.id === id
        })[0]
        setState((prev) => {
            return {...prev, detailProject: item, detail: true}
        })
    }

    const mainRender = () => {
        if (detail === false) {
            return (<div className={clsx(styles.project)}>
            <div className={clsx(styles.board)}> 
                <div className={clsx(styles.search)}>
                    <input type="text" placeholder="Tìm kiếm ..."  value={search} onChange={(e) => handleSearch(e.target.value)}/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className={clsx(styles.filter)}>
                    <select>
                        {
                            statuses.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className={clsx(styles.table)}>
                <DataTable 
                    title="DANH SÁCH DỰ ÁN"
                    columns={columns}
                    data={projects}
                    progressPending={loading}
                    pagination
                    // customStyles={customStyles}
                />
            </div>    
        </div>)
        }
        return (
            <>
                <div className={clsx(styles.back)} onClick={handleBack}><i className="fa-solid fa-arrow-left"></i> Quay lại</div>
                <div className={clsx(styles.content)}>
                <h1 className={clsx(styles.title)}>{detailProject.name}</h1>
                <h3 className={clsx(styles.author)}>{detailProject.author}</h3>
                <ul className={clsx(styles.list)}>
                    {
                        detailProject.fields.map((item, index) => {
                            return <li key={index} className={clsx(styles.item)}>{item.name}</li>
                        })
                    }
                </ul>
                {
                    detailProject.keyValues.map((item, index) => {
                        return <>
                            <div className={clsx(styles.key)} key={index}>{item.key}</div>
                            <div className={clsx(styles.value)}
                                dangerouslySetInnerHTML={{__html: item.value}}
                            ></div>
                        </>
                    })
                }
                </div>
            </>
        )
    }

    // Rendering
    return (mainRender())

}

export default AdminManageProjectPage