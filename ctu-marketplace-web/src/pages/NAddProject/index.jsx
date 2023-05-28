import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import styles from  "./NAddProject.module.css"
import { CKEditor } from 'ckeditor4-react';
import axios from "axios"
import authHeader from "../../services/auth.header";
import DataTable from "react-data-table-component"
import Swal from "sweetalert2";
import NRequire from "../../components/NRequire"
import NValid from "../../components/NValid"
import { useTransition, animated } from "@react-spring/web";
import {useStore} from "../../store/globalstate"
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const NAddProject = () => {
    // Init
    const initState = {
        // Validation
        vProjectName: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vAuthor: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vProjectImage: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vProjectIntroduction: { 
            first: true,
            isValid: true,
            text: '...'
        },
        // Action
        constFields: [],
        pageType: 1,
        projectDetail: null,
        searchInput: '',
        isUpdate: false,
        reCallApi: false,
        statuses: [],
        formatOption: 0,
        statusOption: 0,
        tickFields: [],
        // Data
        projectIntroduction: '',
        projectImageName: '',
        projectImage: null,
        projectListImage: [],
        projects: [],
        loading: false,
        templates: [],
        projectName: '',
        projectAuthor: '',
        form: 4,
        checkFields: [],
        fields: [],
        kvalues: [],
        newField: "",
        // CSS Class
        showAnimation: false    
    }
    const resetValidationState = {
        vProjectName: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vAuthor: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vProjectImage: { 
            first: true,
            isValid: true,
            text: '...'
        },
        vProjectIntroduction: { 
            first: true,
            isValid: true,
            text: '...'
        }
    }
    const resetState = {
        // Data
        templates: [],
        isUpdate: false,
        projectName: '',
        projectAuthor: '',
        form: 1,
        checkFields: [],
        projectIntroduction: '',
        projectImageName: '',
        projectImage: null,
        projectListImage: [],
        fields: [],
        statuses: [],
        kvalues: [],
        tickFields: [],
        newField: "",
        pageType: 1,
        formatOption: 0,
        statusOption: 0,
        // CSS Class
        showAnimation: false    
    }
    const roles = ["NNC"]
    
    // Hooks
    const [localState, setState] = useState(initState)
    const {
        form,
        isUpdate,
        checkFields,
        tickFields, 
        statuses, 
        projectIntroduction ,
        formatOption, 
        statusOption ,
        fields, 
        projectImage, 
        projectImageName, 
        projectListImage,
        kvalues,
        reCallApi,
        searchInput,
        projectDetail, 
        showAnimation, 
        pageType ,
        newField, 
        constFields, 
        projectName, 
        projectAuthor, 
        templates,  
        projects, 
        loading,
        vProjectName,
        vAuthor,
        vProjectImage,
        vProjectIntroduction
    } = localState
    const [state, myDispatch] = useStore()
    const {logStatus, roleCode} = state
    const pageTypeTransitions = useTransition(pageType, {
        from: {opacity: 0},
        enter: {opacity: 1}
    })
    const infoTransitions = useTransition(pageType, {
        from: {opacity: 0},
        enter: {opacity: 1}
    })
    const detailTransitions = useTransition(projectDetail, {
        from: {opacity: 0},
        enter: {opacity: 1}
    })
    const inputFileRef = useRef()

    // Apis
    useEffect(() => {
        // Get All Status
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/admin/status-management`)
        .then((res) => {
            setState((prev) => {
                return {...prev, statuses: res.data.data}
            })
        })
        .catch((err) => {
            console.log(err)
        })
        // Get All Fields
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/fields`)
        .then(res => {
            let allField = res.data.data.map((field) => {
                return {
                    ...field, checked: false
                }
            })
            setState((prev) => {
                return {...prev, fields: allField, constFields: allField}
            })
        })
        .catch(error => {
            console.log(error)
        })
        // Get Project Templates
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects?is_template=true&approve=true`)
        .then(res => {
            setState((prev) => {
                return {...prev, templates: res.data.data}
            })
        })
        .catch(error => {
            console.log(error)
        })
        // Get All Project to List
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
        .then(res => {
            const auth = JSON.parse(localStorage.getItem('userData'))
            const myProjects = res.data.data.filter((item) => {
                return item.user.id === auth.data.id
            })
            setState((prev) => {
                return {...prev, projects: myProjects}
            })
        }).catch(error => {
            console.log(error)
        }) 
    },[reCallApi])
    useEffect(() => {
        localStorage.setItem('keyValues', JSON.stringify(kvalues))
    }, [kvalues])
    // Callback of setState
    useEffect(() => {
        hanldeUploadFile()
    }, [projectImage])
    useEffect(() => {
        const format = formatOption
        const status = statusOption
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
        .then(res => {
            const auth = JSON.parse(localStorage.getItem('userData'))
            let myProjects = res.data.data.filter((item) => {
                return item.user.id === auth.data.id
            })
            if (format !== 0) {
                myProjects = myProjects.filter((project) => {
                    const check = handleConvertFormat()
                    return project.template === check
                })       
            }
            if (status !== 0) {
                myProjects = myProjects.filter((project) => {
                    return project.status.id === status 
                })
            }
            setState((prev) => {
                return {...prev, projects: myProjects}
            })
        }).catch(error => {
            console.log(error)
        })
    }, [formatOption, statusOption])
    useEffect(() => {
        const newCheckedFields = constFields.map((field) => {
            return {
                ...field,
                checked: checkFields.includes(parseInt(field.id))
            }
        })
        setState((prev) => {
            return {...prev, fields: newCheckedFields}
        })
    }, [checkFields])
    useEffect(() => {  
        handleScrollOnTop()
        if (pageType === 1) {
            setState((prev) => {
                return {
                    ...prev, 
                    ...resetState,
                    ...resetValidationState
                }
            })
        }else if (pageType === 3) {
            // Get Project Templates
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects?is_template=true&approve=true`)
            .then(res => {
                setState((prev) => {
                    return {...prev, templates: res.data.data}
                })
            })
            .catch(error => {
                console.log(error)
            })
            // setState((prev) => {
            //     return {...prev, reCallApi:!prev.reCallApi}
            // })
        }
    },[pageType])
    // Handle 
    const handleScrollOnTop = () => {
        window.scrollTo(0, 0)
    }
    const handleUp = (index) => {
        // At least two element
        if (index > 0) {
            const tempObj = kvalues[index]
            // Change value of Editor
            let newList = kvalues
            newList[index] = newList[index - 1]
            newList[index - 1] = tempObj
            setState((prev) => {
                return {...prev, kvalues: newList}
            })
        }
    }
    const hanldeUploadFile = () => {
        if (projectImage !== null) {
            let formData = new FormData()
            formData.append("file", projectImage)
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/upload-image`, formData, { headers: authHeader() })
            .then((res) => {
                setState((prev) => {
                    return {...prev, projectImageName: res.data.data.name}
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Tải ảnh",
                    text: "Tải ảnh không thành công! Vui lòng kiểm tra lại định dạng *.jpg"
                })
            })
        }
    }
    const handleConvertFormat = () => {
        const check = formatOption === 1 ? false : true
        return check
    }
    const handleDown = (index) => {
        // At least two element
        if (index < kvalues.length - 1) {
            const tempObj = kvalues[index]
            let newList = kvalues
            newList[index] = newList[index + 1]
            newList[index + 1] = tempObj
            setState((prev) => {
                return {...prev, kvalues: newList}
            })
        }
    }
    const handleRemoveField = (index) => {
        if (index >= 0 && index < kvalues.length) {
            let newList = kvalues
            newList.splice(index, 1)
            localStorage.setItem('keyValues', JSON.stringify(newList))
            setState((prev) => {
                return {...prev, kvalues: newList}
            })
        }
    }
    const handleEditor = (value, index) => {
        const values = JSON.parse(localStorage.getItem('keyValues') || "[]")
        if (index >= 0 && index < kvalues.length) {
            values[index].value = value 
            setState((prev) => {
                return {...prev, kvalues: values}
            })
        }
    }
    const handleFields = () => {
        const key = newField    
        if (!kvalues.includes(key) && key!=="") {
            const newKeyValue = {
                "key": key,
                "value": ""
            }
            setState((prev) => {
                return {...prev, kvalues: [...prev.kvalues, newKeyValue]}
            })
            setState((prev) => {
                return {...prev, newField:''}
            })
        }
    }
    const handleSetNewField = (value) => {
        setState((prev) => {
            return {...prev, newField: value}
        })
    }
    const preparingData = () => {
        return {
            "name": projectName,
            "image": projectImageName,
            "introduction": projectIntroduction,
            "author": projectAuthor,
            "fieldIds": checkFields,
            "keyValues": kvalues
        }
    }
    const handleProjectName = (value) => {
        setState((prev) => {
            return {...prev, projectName: value, vProjectName: {...validateProjectName(value)}}
        })
    }
    const handleProjectIntroduction = (value) => {
        setState((prev) => {
            return {...prev, projectIntroduction: value, vProjectIntroduction: {...validationProjectIntroduction(value)}}
        })
    }
    const handleProjectAuthor = (value) => {
        setState((prev) => {
            return {...prev, projectAuthor: value, vAuthor: {...validationProjectAuthor(value)}}
        })
    }
    const handleChooseForm = (id) => {
        if (id === 3) {
            if (!handleCheckValidProject()) {
                handleValidationWhenSubmit()
                return 
            }
        }
        setState((prev) => {
            return { ...prev, pageType: id }
        })
    }
    const handleHideShow = () => {
        setState((prev) => {
            return {...prev, showAnimation: !prev.showAnimation}
        })
    }
    const handleFieldSearch = (value) => {

        const newList = constFields.filter((item) => {
            return item.name.includes(value)
        })
        setState((prev) => {
            return {...prev, fields: newList}
        })

    }
    const handleResetCheckField = (templateFields) => {
        const resetCheckFields = checkFields.filter((id) => {
            return !templateFields.includes(id)
        })
        const myTick = tickFields.filter((id) => {
            return !resetCheckFields.includes(id)
        })
        setState((prev) => {return {...prev, checkFields: [...resetCheckFields, ...myTick]}})
    }
    const handleChoosePattern = async(id) => {
        let templateFields = []
        templates.map((template) => {
            template.fields.map((field) => {
                if (!templateFields.includes(field.id)) {
                    templateFields = [...templateFields, field.id]
                }
                return field
            })
            return template
        })
        if (id === 0) {
            handleResetCheckField(templateFields)
            setState((prev) => {return {...prev, kvalues: []}})
        }else{
            const patterns = templates.filter((item) => item.id===id)
            setState((prev) => {return {...prev, kvalues: patterns[0].keyValues}})
            handleResetCheckField(templateFields)
            setTimeout(() => {}, 1000)
            patterns[0].fields.map((field) => {    
                if (!checkFields.includes(field.id)){
                    // add
                    setState((prev) => {
                        return {...prev, checkFields: [...prev.checkFields, field.id]}
                    })
                }
                return field
            })
        }
    }
    const handleChecked = (id) => {
        if (checkFields.includes(id)) {
            // remove
            const removedList = checkFields.filter((item) => item !== id)
            const removedTickList = tickFields.filter((item) => item !== id)
            setState((prev) => {
                return {...prev, checkFields: removedList, tickFields: removedTickList}
            })
        }else{
            // add
            setState((prev) => {
                return {...prev, checkFields: [...prev.checkFields, id], tickFields: [...prev.tickFields, id]}
            })
        }
    }
    const resetComponent = () => {
        handleChooseForm(1)
        const temp = fields
        setState((prev) => {
            return {...prev, ...resetState}
        })
        setState((prev) => {
            return {...prev, fields: temp}
        })
    }
    const handleCreatePattern = () => {
        let json = preparingData()
        if (handleCheckValidProject()) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects?is_template=true`, json, {
                headers: authHeader()
            }).then(res => {
                resetComponent()
                Swal.fire({
                    icon: "success",
                    title: "Tạo mẫu",
                    text: "Mẫu được tạo thành công! Vui lòng chờ xét duyệt của Quản trị viên"
                })
                setState((prev)=> {
                    return {...prev, reCallApi: !prev.reCallApi}
                })
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Tạo mẫu",
                    text: "Mẫu tạo không thành công!"
                })
            })
        }else {
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Thông tin dự án mẫu chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
            })
            handleValidationWhenSubmit()
        }
    }
    const handleCreateProject = () => {
        let json = preparingData()
        if (handleCheckValidProject()) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`, json, {
                headers: authHeader()
            }).then(res => {
                resetComponent()
                Swal.fire({
                    icon: "success",
                    title: "Tạo dự án",
                    text: "Dự án được tạo thành công! Vui lòng chờ xét duyệt của Quản trị viên"
                })
                setState((prev)=> {
                    return {...prev, reCallApi: !prev.reCallApi}
                })
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Tạo dự án",
                    text: "Dự án tạo không thành công!"
                })
            })
        }else {
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Thông tin dự án chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
            })
            handleValidationWhenSubmit()
        }

    }
    const handleCreateBoth = async() => {
        if (handleCheckValidProject()) {
            let json = preparingData()
            let check = true 
            try {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects?is_template=true`, json, {headers: authHeader()})
            }catch (err) {
                check = false
            }
            let json1 = preparingData()
            try {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`, json1, {headers: authHeader()})
            }catch (err) {
                check = false
            }
            if (check === true) {
                resetComponent()
                Swal.fire({
                    icon: "success",
                    title: "Tạo dự án & mẫu",
                    text: "Dự án & mẫu được tạo thành công! Vui lòng chờ xét duyệt của Quản trị viên"
                })
                setState((prev)=> {
                    return {...prev, reCallApi: !prev.reCallApi}
                })
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Tạo dự án & mẫu",
                    text: "Dự án & mẫu tạo không thành công!"
                })
            }
        }else{
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Thông tin dự án chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
            })
            handleValidationWhenSubmit()
        }
    }
    const handleSetSearch = (value) => {
        if (value === "") {
            setState((prev) => {
                return {...prev, reCallApi: !prev.reCallApi}
            })
        }
        setState((prev) => {
            return {...prev, searchInput: value}
        })
    }
    const handleChangeAddPage = () => {
        setState((prev) => {
            return {...prev, form: 1, pageType: 2}
        })
    }
    const handleChangeListPage = () => {
        setState((prev) => {
            return {...prev, form: 4, projectDetail: null ,pageType: 1}
        })
    }
    const handleToList = () => {
        setState((prev) => {
            return {...prev, projectDetail: null, pageType: 1}
        })
    }
    const handleDetailPage = async(projectId) => {
        let rawData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${projectId}`)
        const project = rawData.data.data
        setState((prev) => {
            return {...prev, projectDetail: project}
        })
    }
    const handleEditPage = async(projectId) => {
        let rawData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${projectId}`)
        const project = rawData.data.data
        const data={
            vProjectName: { 
                first: false,
                isValid: true,
                text: '...'
            },
            vAuthor: { 
                first: false,
                isValid: true,
                text: '...'
            },
            vProjectImage: { 
                first: false,
                isValid: true,
                text: '...'
            },
            vProjectIntroduction: { 
                first: false,
                isValid: true,
                text: '...'
            },
            // data
            projectName: project.name,
            projectImageName: project.image,
            projectAuthor: project.author,
            isUpdate: true,
            projectIntroduction: project.introduction,
            checkFields: project.fields.map((item) => { return item.id }),
            kvalues: project.keyValues
        }
        setState((prev) => {
            return {...prev, projectDetail: project, pageType: 2, form: 1,...data}
        })
    }
    const handleSaveProject = () => {
        if (handleCheckValidProject()) {
            let data = preparingData()
            const newKeyValues = data.keyValues.map((item) => {
                return {key: item.key, value: item.value}
            })
            data.keyValues = newKeyValues
            axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${projectDetail.id}`, data, { headers: authHeader() })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật',
                    text: 'Cập nhật thành công'
                })
                setState((prev) => {
                    return {...prev, projectDetail: null, pageType: 1, reCallApi: !prev.reCallApi, form: 4}
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Cập nhật',
                    text: 'Cập nhật không thành công!'
                })
            })
        }else {
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Thông tin dự án chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
            })
            handleValidationWhenSubmit()
        }
    }
    const handleSetFile = (value) => {
        setState((prev) => {
            return {...prev, projectListImage: value}
        })
        if (value.length > 0) {
            setState((prev) => {
                return {...prev, projectImage: value[0], vProjectImage: {...validateProjectImage(value[0])}}
            })
        }else{
            setState((prev) => {
                return {...prev, projectImage: null, vProjectImage: {...validateProjectImage(null)}}
            })
        }
    }
    const handleDelete = async(projectId) => {
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
                axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${projectId}`, {headers: authHeader() })
                .then((res) => {
                    const format = formatOption
                    const status = statusOption
                    axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects`)
                    .then(res => {
                        const auth = JSON.parse(localStorage.getItem('userData'))
                        let myProjects = res.data.data.filter((item) => {
                            return item.user.id === auth.data.id
                        })
                        if (format !== 0) {
                            myProjects = myProjects.filter((project) => {
                                const check = handleConvertFormat()
                                return project.template === check
                            })       
                        }
                        if (status !== 0) {
                            myProjects = myProjects.filter((project) => {
                                return project.status.id === status 
                            })
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Xóa dự án",
                            text: "Dự án đã được xóa thành công"
                        })
                        setState((prev) => {
                            return {...prev, projects: myProjects}
                        })
                    }).catch(error => {
                        console.log(error)
                    })
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Xóa dự án",
                        text: "Không xóa được dự án này! Vui lòng kiểm tra lại trạng thái đăng nhập của bạn"
                    })
                })
            }
          })
        
    }
    const handleRenderButton = (projectId) => {
        return (<div className={clsx(styles.control)}>
            <i onClick={() => handleDetailPage(projectId)} className={clsx(styles.btn, styles.cellBtn, styles.view,`fa-solid fa-eye`,`bg-success`, `text-white`)}></i>
            <i onClick={() => handleEditPage(projectId)} className={clsx(styles.btn, styles.cellBtn, styles.view,`fa-solid fa-pen-to-square`,`bg-primary`, `text-white`)}></i>
            <i onClick={() => handleDelete(projectId)} className={clsx(styles.btn, styles.cellBtn, styles.delete,`fa-solid fa-trash`,`bg-danger`,  `text-white`)}></i>
        </div>)
    }
    const handleSearchFeature = () => {
        let newProjectList = projects.filter((project) => {
            return project.name.includes(searchInput)
        })
        setState((prev) => {
            return {...prev, projects: newProjectList}
        })
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        handleSearchFeature()
    }
    const handleFilterStatus = (value) => {
        setState((prev) => {
            return {...prev, statusOption: parseInt(value)}
        })
    }
    const handleFilterFormat = (value) => {
        setState((prev) => {
            return {...prev, formatOption:  parseInt(value)}
        })
    }
    const handleResetAll = () => {
        setState((prev) => {
            return {...prev, ...resetState, ...resetValidationState}
        })
    }
    // Trigger
    const triggerFileInput = () => {
        inputFileRef.current.click()
    }
    
    // Validation
    const validateProjectName = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập tên dự án !"
            validate.isValid = false 
        }else if (value.length >= 1000) {
            validate.text = "Tên dự án phải ít hơn 1000 ký tự !"
            validate.isValid = false 
        }
        return validate
    }
    const validateProjectImage = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === null) {
            validate.text = "Bạn chưa chọn hình đại diện cho dự án !"
            validate.isValid = false 
        }else if (value.size >= 10485760) {
            validate.text = "Kích thước file nhỏ hơn 10MB! Vui lòng cập nhật lại"
            validate.isValid = false 
        }else if (getExtension(value.name).toLowerCase() !== "jpg"){
            validate.text = "Định dạng hình phải là *.jpg! Vui lòng cập nhật lại"
            validate.isValid = false
        }
        return validate
    }
    const validationProjectAuthor = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập tên tác giả của dự án !"
            validate.isValid = false 
        }else if (value.length >= 1000) {
            validate.text = "Tên tác giả / nhóm tác giả phải ít hơn 1000 ký tự !"
            validate.isValid = false 
        }
        return validate
    }
    const validationProjectIntroduction = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập tóm tắt cho dự án !"
            validate.isValid = false 
        }else if (value >= 2000) {
            validate.text = "Tóm tắt phải ít hơn 2000 ký tự !"
            validate.isValid = false
        }
        return validate
    }
    const handleCheckValidProject = () => {
        const imageCheck = !vProjectImage.first && vProjectImage.isValid || isUpdate
        return vProjectName.isValid && !vProjectName.first && vAuthor.isValid && !vAuthor.first && vProjectIntroduction.isValid && imageCheck && !vProjectIntroduction.first
    }
    const handleValidationWhenSubmit = () => {
        setState((prev => {
            return {
                ...prev,
                vAuthor: {...validationProjectAuthor(prev.projectAuthor)},
                vProjectName: {...validateProjectName(prev.projectName)},
                vProjectIntroduction: {...validationProjectIntroduction(prev.projectIntroduction)},
                vProjectImage: {...validateProjectImage(prev.projectImage)}
            }
        }))
    }

    // Tools 
    const getExtension = (filename) => {
        let parts = filename.split('.');
        return parts[parts.length - 1];
    }
    
    // Sub-components
    const columns = [
        {
            name: "TÊN",
            selector: (row) => row.name,
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
            selector: (row) => handleRenderButton(row.id)
        }
    ]
    const detailComponent = (project) => {
        return (
            <>
            <div className={clsx(styles.controlAbove)}>
                <div className={clsx(styles.btn, `bg-primary text-white`, styles.controlPart)} onClick={handleToList}><i className="fa-solid fa-list"></i> Danh sách</div>
            </div>
            <h1 className={styles.detailTitle}>{project.name}</h1>
            <h3 className={styles.detailAuthor}>{project.author}</h3>
            <ul className={styles.detailFields}>
                {
                    project.fields.map((item, index) => {
                        return (
                            <li key={index} className={clsx(styles.detailItem)}>{item.name}</li>
                        )
                    })
                }
            </ul>
            {
                project.keyValues.map((item,index) => {
                    return (<div key={index} className={clsx(styles.detailKeyValues)}>
                        <div>{item.key}</div>
                        <div
                            dangerouslySetInnerHTML={{__html: item.value}}
                        ></div>
                    </div>)
                })
            }
        </>
        )
        
    }
    const listComponent = () => {
        return (<div className={clsx(styles.form)}>
            {
                detailTransitions((style, item) => {
                    return <animated.div style={style}>
                        {
                            item === null ? <>
                            <div className={clsx(styles.controlAbove)}>
                                {/* <select className={clsx(styles.filter,  styles.controlPart)} onChange={(e) => handleFilterField(e.target.value)}>
                                    <option value={0}>Tất cả lĩnh vực</option>
                                    {
                                        fields.map((field, index) => {
                                            return <option  key={index} value={field.id}>{ field.name.length >= 25 ? field.name.substring(0, 25) : field.name }</option>
                                        })
                                    }
                                </select> */}
                                <select className={clsx(styles.filter,  styles.controlPart)} onChange={(e) => handleFilterStatus(e.target.value)}>
                                    <option value={0}>Tất cả trạng thái</option>
                                    {
                                        statuses.map((status, index) => {
                                            return <option key={index} value={status.id}>{ status.name }</option>
                                        })
                                    }
                                </select>
                                <select className={clsx(styles.filter,  styles.controlPart)} onChange={(e) => handleFilterFormat(e.target.value)}>
                                    <option value={0}>Tất cả loại hình</option>
                                    <option value={1}>Báo cáo</option>
                                    <option value={2}>Mẫu</option>
                                </select>
                                <form className={clsx(styles.search, styles.controlPart)} onSubmit={(e) => handleSearchSubmit(e)}>
                                    <input  value={searchInput} onChange={e => handleSetSearch(e.target.value)} placeholder="Tìm kiếm ..."/>
                                    <i className="fa-solid fa-magnifying-glass" onClick={handleSearchFeature} ></i>
                                </form>
            
                                <div className={clsx(styles.btn, styles.submit, styles.controlPart)} onClick={handleChangeAddPage}><i className="fa-solid fa-plus"></i> Thêm mới</div>
                            </div>
                            <DataTable 
                                columns={columns}
                                data={projects}
                                noDataComponent="Chưa có dự án để hiển thị"
                                progressPending={loading}
                                pagination
                            /></> : detailComponent(item)
                        }
                    </animated.div>
                })
            }
            </div>)
    }
    const infoComponent = (page) => {
        if (page === 2) {
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Thông tin dự án</h1>
                    <ul>
                        <li>Tên dự án</li>
                        <li>Tác giả của dự án</li>
                        <li>Hình đại diện được hiển thị tại trang chủ</li>
                        <li>Tóm tắt ngắn gọn về dự án</li>
                    </ul>
                </div>
            )
        }else if (page === 3) {
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Khởi tạo dự án</h1>
                    <ul>
                        <li>Chọn lĩnh vực có liên quan đến dự án</li>
                        <li>Chọn mẫu để hiện thị các trường có sẵn</li>
                        <li>Thêm + giúp tự tạo ra các trường theo báo cáo của dự án</li>
                    </ul>
                </div>
            )
        }else if (page===4) {
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Chi tiết dự án</h1>
                    <p>Đánh giá lại thông tin chi tiết bạn đã nhập</p>
                </div>
            )
        }else{
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Danh sách dự án</h1>
                    <p>Bao gồm các dự án của bạn</p>
                </div>
            )   
            }
    }    
    const infoMobileComponent = (page) => {
        if (page === 2) {
            return (
                <div className={clsx(styles.mheading)}>
                    <h3>Thông tin dự án</h3>
                    <ul>
                        <li>Tên dự án</li>
                        <li>Tác giả của dự án</li>
                        <li>Hình đại diện được hiển thị tại trang chủ</li>
                        <li>Tóm tắt ngắn gọn về dự án</li>
                    </ul>
                </div>
            )
        }else if (page === 3) {
            return (
                <div className={clsx(styles.mheading)}>
                    <h3>Khởi tạo dự án</h3>
                    <ul>
                        <li>Chọn lĩnh vực có liên quan đến dự án</li>
                        <li>Chọn mẫu để hiện thị các trường có sẵn</li>
                        <li>Thêm trường thông tin giúp tự tạo ra các trường theo báo cáo của dự án</li>
                    </ul>
                </div>
            )
        }else if (page===4) {
            return (
                <div className={clsx(styles.mheading)}>
                    <h3>Chi tiết dự án</h3>
                    <p>Đánh giá lại thông tin chi tiết bạn đã nhập</p>
                </div>
            )
        }else{
            return (
                <div className={clsx(styles.mheading)}>
                    <h3>Danh sách dự án</h3>
                    <p>Bao gốm các dự án của bạn</p>
                </div>
            )   
            }
    }  
    const formComponent1 = () => {
        return (
            <div className={clsx(styles.form)}>
                <div className={clsx(styles.controlAbove)}>
                    <div className={clsx(styles.btn, `bg-primary text-white`, styles.controlPart)} onClick={handleChangeListPage}><i className="fa-solid fa-list"></i> Danh sách</div>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label>Tên <NRequire /></label>
                    <input 
                        type="text"
                        placeholder="Dự án 1 ..."
                        value={projectName || ""}
                        onChange={(e)=>handleProjectName(e.target.value)}
                    />
                    <NValid isValid={vProjectName.first || vProjectName.isValid} text={vProjectName.text}/>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label>Tác giả  <NRequire /></label>
                    <input 
                        type="text"
                        placeholder="Nguyễn Văn A ..."
                        value={projectAuthor || ""}
                        onChange={(e)=>handleProjectAuthor(e.target.value)}
                    />
                    <NValid isValid={vAuthor.first || vAuthor.isValid} text={vAuthor.text}/>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label>{`Hình đại diện`}  <NRequire /></label>
                    <div className={clsx(styles.input)} onClick={triggerFileInput}>
                        <div className={clsx(styles.inputBtn)}>Chọn ảnh</div>
                        <div className={clsx(styles.inputText)}>{projectImageName ? projectImageName : "< 10MB, *.jpg"}</div>
                    </div>
                    <NValid isValid={vProjectImage.first || vProjectImage.isValid} text={vProjectImage.text}/>
                </div>

                {/* Hidden element */}
                <input 
                    type="file"
                    accept="image/jpeg" 
                    onChange={(e)=>handleSetFile(e.target.files)}
                    className={clsx(styles.fileInput)}
                    ref={inputFileRef}
                />

                <div className={clsx(styles.formGroup)}>
                    <label>Tóm tắt  <NRequire /></label>
                    <textarea cols="30" rows="10" value={projectIntroduction} onChange={(e) => handleProjectIntroduction(e.target.value)} placeholder="Đôi nét về dự án của bạn ..."></textarea>
                    <NValid isValid={vProjectIntroduction.first || vProjectIntroduction.isValid} text={vProjectIntroduction.text}/>
                </div>

                <div className={clsx(styles.formControl)}>
                    <div className={clsx(styles.formGroup)}>
                        <div className={clsx(styles.btn, styles.primary)}
                            onClick={() => handleChooseForm(3)}
                        >
                            Tiếp tục
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const formComponent2 = () => {
        return (<div className={clsx(styles.form)}>
        <div className={clsx(styles.controlAbove)}>
            <div className={clsx(styles.btn, `bg-primary text-white`, styles.controlPart)} onClick={handleChangeListPage}><i className="fa-solid fa-list"></i> Danh sách</div>
        </div>
        <div className={clsx(styles.formGroup)}>
            <label>Chọn mẫu</label>
            <select onChange={(e) => handleChoosePattern(parseInt(e.target.value))}>
                <option value={0} key={0}>Chọn mẫu</option>
                {
                    templates.map((item, index) => {
                        return <option value={item.id}  key={index}>{item.name}</option>
                    })
                }
            </select>
        </div>
        <div className={clsx(styles.formGroup)}>
            <label>Lĩnh vực</label>
            <div className={clsx(styles.selectSearch)}>
                <div className={clsx(styles.dropdown)}>
                    <input 
                        type="text"
                        placeholder="Chọn lĩnh vực ..."
                        onChange={(e) => handleFieldSearch(e.target.value)}
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className={clsx(styles.dropdownBox)}>
                    {
                        fields.map((item, index) => {
                            return (<div className={clsx(styles.checkBox)} key={index}>
                                <input  type="checkbox" name="fields" value={item.id}
                                    onChange={() => handleChecked(item.id)}
                                    checked={item.checked}
                                />
                                <label htmlFor="fields">{item.name}</label>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>

        {
            kvalues.map((item, index) => {
                return (
                    <div className={clsx(styles.formEditor)} key={index}>
                        <div className={clsx(styles.editorName)}>
                            <span>{item.key}</span>
                            {/* <i onClick={() => handleUp(index)} className="fa-sharp bg-primary text-white fa-solid fa-arrow-up"></i>
                            <i onClick={() => handleDown(index)} className="fa-sharp bg-success fa-solid text-white fa-arrow-down"></i> */}
                            <i onClick={() => handleRemoveField(index)} className="fa-solid bg-danger text-white fa-trash"></i>
                        </div>
                        <CKEditor 
                            id={item.key}
                            name={`CK-${index}`}
                            initData={item.value || ""}
                            config={{
                                filebrowserUploadUrl: 'https://marketplace.ctu.edu.vn/api/v2/upload-file',
                                removeButtons: 'PasteFormWord',
                                isReadOnly: true,
                                height: 400,
                                extraPlugins: [["embed,autoembed,language,justify,colorbutton,font"]],
                                embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',    
                            }}
                            onChange={(e) => handleEditor(e.editor.getData(), index)}
                        />
                    </div>)
            })
        }

            <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.btn, styles.btnFeature)}
                    onClick={handleHideShow}
                >
                    Thêm trường thông tin +
                </div>
                <div className={clsx({
                    [styles.formCover]: true,
                    [styles.showAnimation]: showAnimation
                })}>
                    <div className={clsx(styles.formModal)}>
                        <div onClick={handleHideShow}><strong>X</strong></div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Tên trường <NRequire/></label>
                            <input 
                                type="text"
                                placeholder="Trường xuất xứ ..."
                                value={newField || ""}
                                onChange={(e) => handleSetNewField(e.target.value)}
                            />
                            <NValid  
                                isValid={newField !== ""}
                                text={"Bạn cần nhập tên trường muốn thêm!"}
                            />
                        </div>
                        <div className={clsx(styles.btn, styles.submit)}
                            onClick={handleFields}
                        >       
                            Thêm
                        </div>
                    </div>
                </div>

            </div>

        {/* Add more field here */}
        <div className={clsx(styles.formControl)}>
            <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.btn, styles.submit)}
                    onClick={() => handleChooseForm(2)}
                >
                    Quay lại
                </div>
                <div className={clsx(styles.btn, styles.primary)}
                    onClick={() => handleChooseForm(4)}
                >
                    Tiếp tục
                </div>
            </div>
        </div>
    </div>)
    }
    const formComponent3 = () => {
        return (
            <div className={clsx(styles.detail)}>
                <div className={clsx(styles.controlAbove)}>
                    <div className={clsx(styles.btn, `bg-primary text-white`, styles.controlPart)} onClick={handleChangeListPage}><i className="fa-solid fa-list"></i> Danh sách</div>
                </div>
                <h1 className={styles.detailTitle}>{projectName}</h1>
                <h3 className={styles.detailAuthor}>{projectAuthor}</h3>
                <ul className={styles.detailFields}>
                    {
                        fields.filter((item) => {
                            return checkFields.includes(item.id)
                        }).map((item, index) => {
                            return (
                                <li key={index} className={clsx(styles.detailItem)}>{item.name}</li>
                            )
                        })
                    }
                </ul>
                {
                    kvalues.map((item,index) => {
                        return (<div key={index} className={clsx(styles.detailKeyValues)}>
                            <div>{item.key}</div>
                            <div
                                dangerouslySetInnerHTML={{__html: item.value}}
                            ></div>
                        </div>)
                    })
                }
                {
                    projectDetail===null ? <div className={clsx(styles.detailControl, styles.formControl)}>
                        <div className={clsx(styles.btn, styles.submit)} onClick={() => handleChooseForm(3)} >Quay lại</div>
                        <div className={clsx(styles.btn, styles.primary)}
                            onClick={handleCreatePattern}
                        >Tạo mẫu</div>
                        <div className={clsx(styles.btn, styles.primary)}
                            onClick={handleCreateBoth}
                        >Lưu và Tạo mẫu</div>
                        <div 
                            onClick={handleCreateProject}
                        className={clsx(styles.btn, styles.primary)}>Lưu</div>
                    </div> : <div className={clsx(styles.detailContro, styles.formControl)}>
                    <div className={clsx(styles.btn, styles.submit)} onClick={() => handleChooseForm(3)} >Quay lại</div>
                    <div 
                        onClick={handleSaveProject}
                    className={clsx(styles.btn, styles.primary)}>Lưu</div>
                </div>
                }
            </div>)
    }
    // Primary render
    return (
        <>
            {/* { handleScrollOnTop() } */}
            { !logStatus || !roles.includes(roleCode) ? <Redirect to="/" /> : '' }
            <div className={clsx(styles.nAddProject)}>
                <div className={clsx(styles.nAddProjectInfo, styles.nAddProjectPart)}>
                    {
                        infoTransitions((style, item) => {
                            return <animated.div style={style}>
                                { infoComponent(item) }
                            </animated.div>
                        })
                    }
                </div>
                <div className={clsx(styles.nAddProjectControl, styles.nAddProjectPart, styles.formParent)}>
                    {
                        infoTransitions((style, item) => {
                            return <animated.div style={style}>
                                { infoMobileComponent(item) }
                            </animated.div>
                        })
                    }
                    {
                        pageTypeTransitions((style, item) => {
                            return <animated.div style={style} >
                                { item === 1 && listComponent() }
                                { item === 2 && formComponent1() }
                                { item === 3 && formComponent2() }
                                { item === 4 && formComponent3() }
                            </animated.div>
                        })
                    }
                </div>
            </div>
        </>
    )

}

export default NAddProject