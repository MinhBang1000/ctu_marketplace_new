import React, { useEffect, useState } from "react"
import clsx from "clsx"
import styles from  "./NAddProject.module.css"
import { CKEditor } from 'ckeditor4-react';
import axios from "axios"
import authHeader from "../../services/auth.header";
import Toast from "../../components/Toast";


const NAddProject = () => {
    // Init
    const initState = {
        // Action
        toast: 0,
        // Data
        templates: [],
        projectName: '',
        projectAuthor: '',
        form: 1,
        checkFields: [],
        fields: [],
        kvalues: [],
        newField: "",
        // CSS Class
        showAnimation: false    
    }
    // Apis
    
    
    useEffect(() => {
        // Get All Fields
        axios.get("https://127.0.0.1:3999/api/v3/fields")
        .then(res => {
            setState((prev) => {
                return {...prev, fields: res.data.data}
            })
        })
        .catch(error => {
            console.log(error)
        })
        // Get Project Templates
        axios.get("https://127.0.0.1:3999/api/v3/projects?is_template=true&approve=true")
        .then(res => {
            console.log(res.data.data);
            setState((prev) => {
                return {...prev, templates: res.data.data}
            })
        })
        .catch(error => {
            console.log(error)
        })
            
    },[])



    // Hooks
    const [state, setState] = useState(initState)
    const {form, checkFields, fields, kvalues, showAnimation, newField, projectName, projectAuthor, templates, toast} = state

    const resetState = {
        // Data
        templates: [],
        projectName: '',
        projectAuthor: '',
        form: 1,
        checkFields: [],
        fields: [],
        kvalues: [],
        newField: "",
        // CSS Class
        showAnimation: false    
    }

    // Handle 
    const handleUp = (index) => {
        // At least two element
        if (index > 0) {
            const tempObj = kvalues[index]
            let newList = kvalues
            newList[index] = newList[index - 1]
            newList[index - 1] = tempObj
            setState((prev) => {
                return {...prev, kvalues: newList}
            })
        }
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
            setState((prev) => {
                return {...prev, kvalues: newList}
            })
        }
    }

    const handleEditor = (value, index) => {
        const  values = kvalues
        if (index >= 0 && index < kvalues.length) {
            values[index]["value"] = value 
            setState((prev) => {
                return {...prev, kvalues: values}
            })
        }
    }

    const handleFields = () => {
        const key = newField
        if (!kvalues.includes(key)) {
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
            "author": projectAuthor,
            "fieldIds": checkFields,
            "keyValues": kvalues
        }
    }

    const handleProjectName = (value) => {
        setState((prev) => {
            return {...prev, projectName: value}
        })
    }

    const handleProjectAuthor = (value) => {
        setState((prev) => {
            return {...prev, projectAuthor: value}
        })
    }

    const handleChooseForm = (id) => {
        if (id === 3) {
            preparingData()
        }
        setState((prev) => {
            return {...prev, form: id}
        })
    }

    const handleHideShow = () => {
        setState((prev) => {
            return {...prev, showAnimation: !prev.showAnimation}
        })
    }

    const handleFieldSearch = (value) => {

        const newList = fields.filter((item) => {
            return item.name.includes(value)
        })
        setState((prev) => {
            return {...prev, fields: newList}
        })

    }

    const handleChoosePattern = (id) => {
        const pattern = templates.filter((item) => item.id==id)[0]
        if (id == 0) {
            setState((prev) => {return {...prev, kvalues: []}})
        }else{
            setState((prev) => {return {...prev, kvalues: pattern.keyValues}})
        }
    }

    const handleChecked = (id) => {
        if (state.checkFields.includes(id)) {
            // remove
            const removedList = state.checkFields.filter((item) => item.id !== id)
            setState((prev) => {
                return {...prev, checkFields: removedList}
            })
        }else{
            // add
            setState((prev) => {
                return {...prev, checkFields: [...prev.checkFields, id]}
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
        axios.post("https://127.0.0.1:3999/api/v3/projects?is_template=true", json, {
            headers: authHeader()
        }).then(res => {
            resetComponent()
            handleChangeToast(1)
        }).catch(error => {
            handleChangeToast(2)
        })
    }

    const handleCreateProject = () => {
        let json = preparingData()
        axios.post("https://127.0.0.1:3999/api/v3/projects", json, {
            headers: authHeader()
        }).then(res => {
            resetComponent()
            handleChangeToast(1)
        }).catch(error => {
            handleChangeToast(2)
        })
    }

    const handleCreateBoth = () => {
        let json = preparingData()
        let check = true 
        axios.post("https://127.0.0.1:3999/api/v3/projects?is_template=true", json, {
            headers: authHeader()
        }).then(res => {
            check = true
        }).catch(error => {
            check = false 
        })
        let json1 = preparingData()
        axios.post("https://127.0.0.1:3999/api/v3/projects", json1, {
            headers: authHeader()
        }).then(res => {
            check = true 
        }).catch(error => {
            check = false 
        })
        if (check == true) {
            resetComponent()
            handleChangeToast(1)
        }else{
            handleChangeToast(2)
        }
    }
    

     // Sub-components
     const infoComponent = () => {

        if (form === 1) {
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Thông tin dự án</h1>
                    <ul>
                        <li>Tên dự án</li>
                        <li>Tác giả của dự án</li>
                        <li>Các lĩnh vực có liên quan</li>
                    </ul>
                </div>
            )
        }else if (form === 2) {
            return (
                <div className={clsx(styles.heading)}>
                    <h1>Thông tin dự án</h1>
                    <ul>
                        <li>Hiển thị thông tin chi tiết theo mẫu</li>
                        <li>Chọn mẫu tại thư viện</li>
                    </ul>
                </div>
            )
        }
        return (
            <div className={clsx(styles.heading)}>
                <h1>Chi tiết dự án</h1>
                <p>Đánh giá lại thông tin chi tiết bạn đã nhập</p>
            </div>
        )
        

    } 
    
    const formComponent = () => {
        if (form === 1) {
            return (
                <form className={clsx(styles.form)}>
                    <div className={clsx(styles.formGroup)}>
                        <label>Tên</label>
                        <input 
                            type="text"
                            placeholder="Dự án 1 ..."
                            value={projectName || ""}
                            onChange={(e)=>handleProjectName(e.target.value)}
                        />
                    </div>

                    <div className={clsx(styles.formGroup)}>
                        <label>Tác giả</label>
                        <input 
                            type="text"
                            placeholder="Nguyễn Văn A ..."
                            value={projectAuthor || ""}
                            onChange={(e)=>handleProjectAuthor(e.target.value)}
                        />
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
                                                onClick={(e) => handleChecked(item.id)}
                                                defaultChecked={checkFields.includes(item.id)}
                                            />
                                            <label htmlFor="fields">{item.name}</label>
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.formGroup)}>
                        <div className={clsx(styles.btn, styles.btnSecondary)}>
                            Đặt lại
                        </div>
                        <div className={clsx(styles.btn)}
                            onClick={() => handleChooseForm(2)}
                        >
                            Tạo
                        </div>
                    </div>
                </form>
            )
        } else if (form === 2) {
            return (<form className={clsx(styles.form)}>
                <div className={clsx(styles.formGroup)}>
                    <label>Chọn mẫu</label>
                    <select onChange={e => handleChoosePattern(e.target.value)}>
                        <option value={0} key={0}>Chọn mẫu</option>
                        {
                            templates.map((item, index) => {
                                return <option value={item.id} key={index}>{item.name}</option>
                            })
                        }
                    </select>
                </div>

                {
                    kvalues.map((item, index) => {
                        return (
                            <div className={clsx(styles.formEditor)} key={index}>
                                <div className={clsx(styles.editorName)}>
                                    <span>{item.key}</span>
                                    <i onClick={() => handleUp(index)} className="fa-sharp text-primary fa-solid fa-arrow-up"></i>
                                    <i onClick={() => handleDown(index)} className="fa-sharp text-success fa-solid fa-arrow-down"></i>
                                    <i onClick={() => handleRemoveField(index)} className="fa-solid text-danger fa-trash"></i>
                                </div>
                                <CKEditor 
                                    id={item.key}
                                    name={item.key}
                                    activeClass={item.key}
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

                {/* Add more field here */}
                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.btn, styles.btnFeature)}
                        onClick={handleHideShow}
                    >
                        Thêm +
                    </div>
                    <div className={clsx({
                        [styles.formCover]: true,
                        [styles.showAnimation]: showAnimation
                    })}>
                        <div className={clsx(styles.formModal)}>
                            <div onClick={handleHideShow}><strong>X</strong></div>
                            <div className={clsx(styles.formGroup)}>
                                <label>Tên trường</label>
                                <input 
                                    type="text"
                                    placeholder="Trường xuất xứ ..."
                                    value={newField || ""}
                                    onChange={(e) => handleSetNewField(e.target.value)}
                                />
                            </div>
                            <div className={clsx(styles.btn, styles.btnPrimary)}
                                onClick={handleFields}
                            >       
                                Thêm
                            </div>
                        </div>
                    </div>

                </div>

                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.btn, styles.btnSecondary)}
                        onClick={() => handleChooseForm(1)}
                    >
                        Quay lại
                    </div>
                    <div className={clsx(styles.btn)}
                        onClick={() => handleChooseForm(3)}
                    >
                        Tiếp tục
                    </div>
                </div>
            </form>)
        }
        
        return (
        <div className={clsx(styles.detail)}>
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
            <div className={clsx(styles.detailControl)}>
                <div className={clsx(styles.btn, styles.btnSecondary)} onClick={() => handleChooseForm(2)} >Quay lại</div>
                <div className={clsx(styles.btn)}
                    onClick={handleCreatePattern}
                >Tạo mẫu</div>
                <div className={clsx(styles.btn)}
                    onClick={handleCreateBoth}
                >Lưu và Tạo mẫu</div>
                <div 
                    onClick={handleCreateProject}
                className={clsx(styles.btn)}>Lưu</div>
            </div>
        </div>)
    }

    const handleChangeToast = (value) => {
        setState((prev) => {
            return {...prev, toast: value}
        })
    }

    const toastRender = (option) => {
        if (option === 1) {
            return (<Toast 
                title='Thành công'
                message='Thao tác thêm thành công'
                status={true}
                changeToast={(value) => handleChangeToast(value)}
            />)
        } else {
            if (option === 2) {
                return (<Toast 
                    title='Thất bại'
                    message='Thao tác thêm thất bại'
                    status={false}
                    changeToast={(value) => handleChangeToast(value)}
                />)
            }
        } 
        return (<></>)
    }

    // Primary render
    return (
        <>
            {toastRender(toast)}
            <div className={clsx(styles.nAddProject)}>
                <div className={clsx(styles.nAddProjectInfo, styles.nAddProjectPart)}>
                    {infoComponent()}
                    <div className={styles.contact}>
                        <div>Nếu bạn có thắc mắc</div>
                        <div>Liên hệ <i className="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
                <div className={clsx(styles.nAddProjectControl, styles.nAddProjectPart)}>
                    {formComponent()}
                </div>
            </div>
        </>
    )

}

export default NAddProject