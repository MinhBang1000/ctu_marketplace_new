import React, { useState } from "react"
import clsx from "clsx"
import styles from  "./NAddProject.module.css"
import fieldDatas from "./fields.json"
import patterns from "./patterns.json"
import { CKEditor } from 'ckeditor4-react';


const NAddProject = () => {
    // Init
    const initState = {
        // Data
        form: 1,
        checkFields: [],
        fields: fieldDatas,
        kvalues: [],
        newField: "",
        // CSS Class
        showAnimation: false    
    }

    // Hooks
    const [state, setState] = useState(initState)
    const {form, checkFields, fields, kvalues, showAnimation, newField} = state

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
 
    const editorComponent = ({key, value, handleChange}) => {
        return (<CKEditor 
            id={key}
            name={key}
            activeClass={key}
            initData={value !== '' ? value : ''}
            config={{
                filebrowserUploadUrl: 'https://marketplace.ctu.edu.vn/api/v2/upload-file',
                removeButtons: 'PasteFormWord',
                isReadOnly: true,
                height: 400,
                extraPlugins: [["embed,autoembed,language,justify,colorbutton,font"]],
                embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',    
            }}
            onChange={handleChange}
        />)
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

    const handleEditor = () => {

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

    const handleConvertJSON = () => {
        
    }

    const handleChooseForm = (id) => {
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

        const newList = fieldDatas.filter((item) => {
            return item.name.includes(value)
        })
        setState((prev) => {
            return {...prev, fields: newList}
        })

    }

    const handleChoosePattern = (id) => {
        const pattern = patterns.filter((item) => item.id==id)[0]
        if (id == 0) {
            setState((prev) => {return {...prev, kvalues: []}})
        }else{
            setState((prev) => {return {...prev, kvalues: pattern.keyvalues}})
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
    
    const formComponent = () => {
        if (form === 1) {
            return (
                <form className={clsx(styles.form)}>
                    <div className={clsx(styles.formGroup)}>
                        <label>Tên</label>
                        <input 
                            type="text"
                            placeholder="Dự án 1 ..."
                        />
                    </div>

                    <div className={clsx(styles.formGroup)}>
                        <label>Tác giả</label>
                        <input 
                            type="text"
                            placeholder="Nguyễn Văn A ..."
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
                        <div className={clsx(styles.btn, styles.btnReset)}>
                            Đặt lại
                        </div>
                        <div className={clsx(styles.btn, styles.btnSubmit)}
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
                            patterns.map((item, index) => {
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
                                {editorComponent(item.key, item.value, handleEditor)}
                            </div>)
                    })
                }

                {/* Add more field here */}
                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.btn, styles.btnModal)}
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
                                    value={newField}
                                    onChange={(e) => handleSetNewField(e.target.value)}
                                />
                            </div>
                            <div className={clsx(styles.btn, styles.btnModalCreate)}
                                onClick={handleFields}
                            >       
                                Thêm
                            </div>
                        </div>
                    </div>

                </div>

                <div className={clsx(styles.formGroup)}>
                    <div className={clsx(styles.btn, styles.btnReset)}
                        onClick={() => handleChooseForm(1)}
                    >
                        Quay lại
                    </div>
                    <div className={clsx(styles.btn, styles.btnSubmit)}
                        onClick={() => handleChooseForm(3)}
                    >
                        Tiếp tục
                    </div>
                </div>
            </form>)
        }
        
        return (
        <form className={clsx(styles.form)}>
            <div className={clsx(styles.formGroup)}>
                <label>Tên</label>
                <input 
                    type="text"
                    placeholder="Dự án 1 ..."
                />
            </div>

            <div className={clsx(styles.formGroup)}>
                <label>Tác giả</label>
                <input 
                    type="text"
                    placeholder="Nguyễn Văn A ..."
                />
            </div>

            <div className={clsx(styles.formGroup)}>
                <label>Lĩnh vực</label>
                <div className={clsx(styles.selectSearch)}>
                    <div className={clsx(styles.dropdown)}>
                        <input 
                            type="text"
                            placeholder="Chọn lĩnh vực ..."
                            />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className={clsx(styles.dropdownBox)}>
                        <div className={clsx(styles.checkBox)}>
                            <input  type="checkbox" name="fields"/>
                            <label htmlFor="fields">Công nghệ thông tin</label>
                        </div>
                        <div className={clsx(styles.checkBox)}>
                            <input  type="checkbox" name="fields"/>
                            <label htmlFor="fields">Khoa học tự nhiên</label>
                        </div>
                        <div className={clsx(styles.checkBox)}>
                            <input  type="checkbox" name="fields"/>
                            <label htmlFor="fields">Khoa học xã hội</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.btn, styles.btnReset)}>
                    Đặt lại
                </div>
                <div className={clsx(styles.btn, styles.btnSubmit)}>
                    Tạo
                </div>
            </div>
        </form>)
    }



    // Rendering this page !
    return (
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
    )

}

export default NAddProject