import React, { useEffect, useState } from "react"
import clsx from "clsx"
import styles from "./ProjectManager.module.css"
import axios from "axios"
import authHeader from "../../services/auth.header"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"
import NSearch from "../../components/NSearch"
import { useTransition, animated } from "@react-spring/web"
import NSelect from "../../components/NSelect"
import NButton from "../../components/NButton"

const NAdminProject = () => {
    // Init
    const initState = {
        detail: false,
        detailProject: {},
        projectSearch: '',
        projectListStatus: [],
        projectStatus: 0,
        projectListFormat: [],
        projectFormat: 0,
        // data
        projects: [],
        loading: false,
        // trick
        reCallApis: false,
    }
    // Hooks
    const [state, setState] = useState(initState)
    const {
        projectSearch, 
        loading, 
        projects, 
        reCallApis,
        detail, 
        detailProject,
        projectListStatus,
        projectStatus,
        projectListFormat,
        projectFormat
    } = state
    const projectDetailTransitions = useTransition(detail, {
        from: { opacity: 0 },
        enter: { opacity: 1 }
    })
    // Apis
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/status-management`, {
            headers: authHeader()
        }).then(res => {
            setState((prev) => {
                return {...prev, projectListStatus: res.data.data}
            })
        }).catch(error => {
            console.log(error)
        })  

    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
        .then(res => {
            let allOfProject = res.data.data 
            if (projectFormat !== 0) {
                const check = projectFormat === 2
                allOfProject = allOfProject.filter((project) => {
                    return project.template === check 
                })
            }
            if (projectStatus !== 0) {
                allOfProject = allOfProject.filter((project) => {
                    return project.status.id === projectStatus
                })
            }
            if (projectSearch !== "") {
                allOfProject = allOfProject.filter((project) => {
                    return project.name.includes(projectSearch)
                })
            }
            setState((prev) => {
                return {...prev, projects: allOfProject}
            })
        }).catch(error => {
            console.log(error)
        })
    }, [projectFormat, projectStatus, projectSearch])
    // Handle
    const handleDenied = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/approve/${id}?TC=true`,null,{
            headers: authHeader()
        }).then(res => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Từ chối dự án",
                    text: "Từ chối dự án thành công !"
                })
                let allOfProject = res.data.data 
                if (projectFormat !== 0) {
                    const check = projectFormat === 2
                    allOfProject = allOfProject.filter((project) => {
                        return project.template === check 
                    })
                }
                if (projectStatus !== 0) {
                    allOfProject = allOfProject.filter((project) => {
                        return project.status.id === projectStatus
                    })
                }
                if (projectSearch !== "") {
                    allOfProject = allOfProject.filter((project) => {
                        return project.name.includes(projectSearch)
                    })
                }
                setState((prev) => {
                    return {...prev, projects: allOfProject}
                })
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Từ chối dự án",
                    text: "Từ chối dự án không thành công !"
                })
            }) 
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: "Từ chối dự án",
                text: "Từ chối dự án không thành công !"
            })        
        })
    }
    const handleApprove = (id) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/approve/${id}?DD=true`,null,{
            headers: authHeader()
        }).then(res => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
            .then(res => {
                let allOfProject = res.data.data 
                if (projectFormat !== 0) {
                    const check = projectFormat === 2
                    allOfProject = allOfProject.filter((project) => {
                        return project.template === check 
                    })
                }
                if (projectStatus !== 0) {
                    allOfProject = allOfProject.filter((project) => {
                        return project.status.id === projectStatus
                    })
                }
                if (projectSearch !== "") {
                    allOfProject = allOfProject.filter((project) => {
                        return project.name.includes(projectSearch)
                    })
                }
                Swal.fire({
                    icon: "success",
                    title: "Chấp thuận dự án",
                    text: "Chấp thuận dự án thành công !"
                })
                setState((prev) => {
                    return {...prev, projects: allOfProject}
                })
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Chấp thuận dự án",
                    text: "Chấp thuận dự án không thành công !"
                })            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: "Chấp thuận dự án",
                text: "Chấp thuận dự án không thành công !"
            }) 
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
                        let allOfProject = res.data.data 
                        if (projectFormat !== 0) {
                            const check = projectFormat === 2
                            allOfProject = allOfProject.filter((project) => {
                                return project.template === check 
                            })
                        }
                        if (projectStatus !== 0) {
                            allOfProject = allOfProject.filter((project) => {
                                return project.status.id === projectStatus
                            })
                        }
                        if (projectSearch !== "") {
                            allOfProject = allOfProject.filter((project) => {
                                return project.name.includes(projectSearch)
                            })
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Xóa dự án",
                            text: "Dự án đã được xóa thành công"
                        })
                        setState((prev) => {
                            return {...prev, projects: allOfProject}
                        })
                    }).catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Xóa dự án",
                            text: "Không xóa được dự án này! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
                        })
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
    const handleRenderButton = (status, projectId) => {
        if (status.code === "CD") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => handleApprove(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.approved,`fa-solid fa-check`,`bg-primary`, `text-white`)}></i>
                    <i onClick={() => handleDenied(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.denied,`fa-solid fa-xmark`, `bg-warning`)}></i>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                </div>
            )
        }else if (status.code === "DD") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleDenied(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.denied,`fa-solid fa-xmark`, `bg-warning`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                </div>
            )
        }else if (status.code === "TC") {
            return (
                <div className={clsx(styles.control)}>
                    <i onClick={() => detailPage(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
                    <i onClick={() => handleApprove(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.approved,`fa-solid fa-check`,`bg-primary`, `text-white`)}></i>
                    <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.cellBtn,styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
                </div>
            )
        }
    }
    const handleSetProjectSearch = (value) => {
        setState((prev) => {
            return {...prev, projectSearch: value}
        })
    }
    const handleSetProjectStatus = (value) => {
        setState((prev) => {
            return {...prev, projectStatus: parseInt(value)}
        })
    }
    const handleSetProjectFormat = (value) => {
        setState((prev) => {
            return {...prev, projectFormat: parseInt(value)}
        })
    }
    const handleSetProjectCreator = (value) => {
        setState((prev) => {
            return {...prev, projectCreator: value}
        })
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
    // Sub-components
    const detailPage = (id) => {
        const item = projects.filter((item) => {
            return item.id === id
        })[0]
        setState((prev) => {
            return {...prev, detailProject: item, detail: true}
        })
    }
    const projectDetailComponent = () => {
        return (
            <>
                <div className={clsx(styles.back)}><NButton clickFunc={handleBack} btnType={`success`}><i className="fa-solid fa-arrow-left"></i> Quay lại</NButton></div>
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

    const projectListComponent = () => {
        return (
            <div className={clsx(styles.project)}>
                <div className={clsx(styles.board)}> 
                    {/* <NSelect classByParent={styles.boardItem} setValue={handleSetProjectCreator}>
                        {
                            projectListCreator && projectListCreator.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </NSelect> */}
                    <NSelect classByParent={styles.boardItem} setValue={handleSetProjectFormat}>
                        <option value={0}>Tất cả loại hình</option>
                        <option value={1}>Báo cáo</option>
                        <option value={2}>Mẫu</option>
                    </NSelect>
                    <NSelect classByParent={styles.boardItem} setValue={handleSetProjectStatus}>
                    <option value={0}>Tất cả trạng thái</option>
                        {
                            projectListStatus && projectListStatus.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </NSelect>
                    <NSearch classByParent={styles.boardItem} placeholder={"Tìm kiếm nghiên cứu ..."} value={projectSearch} setValue={handleSetProjectSearch}/>
                </div>
                <div className={clsx(styles.table)}>
                    <DataTable 
                        columns={columns}
                        noDataComponent="Chưa có dự án để hiển thị"
                        data={projects}
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
            projectDetailTransitions((style, item) => {
                return <animated.div style={style}>
                    { !item ? projectListComponent() : projectDetailComponent() }
                </animated.div>
            })
        }
    </>)

}

export default NAdminProject