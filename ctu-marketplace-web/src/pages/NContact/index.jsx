import React from "react"
import clsx from "clsx"
import styles from "./NContact.module.css"
import NInput from "../../components/NInput"
import { useState } from "react"
import NButton from "../../components/NButton"
import NRequire from "../../components/NRequire"
import NValid from "../../components/NValid"
import Swal from "sweetalert2"
import axios from "axios"

const NContact = () => {
    // Data
    const initState = {
        // Validation
        vName: {
            first: true,
            isValid: true,
            text: '...'
        },
        vEmail: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPhone: {
            first: true,
            isValid: true,
            text: '...'
        },
        vTitle: {
            first: true,
            isValid: true,
            text: '...'
        },
        vContent: {
            first: true,
            isValid: true,
            text: '...'
        },
        // Data
        letterName: '',
        letterEmail: '',
        letterPhone: '',
        letterTitle: '',
        letterContent: ''
    }
    const resetValidationState = {
        vName: {
            first: true,
            isValid: true,
            text: '...'
        },
        vEmail: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPhone: {
            first: true,
            isValid: true,
            text: '...'
        },
        vTitle: {
            first: true,
            isValid: true,
            text: '...'
        },
        vContent: {
            first: true,
            isValid: true,
            text: '...'
        },
    }
    const resetState = {
        letterName: '',
        letterEmail: '',
        letterPhone: '',
        letterTitle: '',
        letterContent: ''
    }

    // Hooks
    const [localState, setState] = useState(initState)
    const {
        vName,
        vEmail,
        vPhone,
        vTitle,
        vContent,
        letterName,
        letterEmail,
        letterPhone,
        letterTitle,
        letterContent
    } = localState

    // Handle
    const handleReset = () => {
        setState((prev) => {
            return {...prev, ...resetState, ...resetValidationState}
        })
    }
    const handleSetName = (value) => {
        setState((prev) => {
            return {...prev, letterName: value, vName: {...validateName(value)}}
        })
    }
    const handleSetEmail = (value) => {
        setState((prev) => {
            return {...prev, letterEmail: value, vEmail: {...validateEmail(value)}}
        })
    }
    const handleSetPhone = (value) => {
        setState((prev) => {
            return {...prev, letterPhone: value, vPhone: {...validatePhone(value)}}
        })
    }
    const handleSetTitle = (value) => {
        setState((prev) => {
            return {...prev, letterTitle: value, vTitle: {...validateTitle(value)}}
        })
    }
    const handleSetContent = (value) => {
        setState((prev) => {
            return {...prev, letterContent: value, vContent: {...validateContent(value)}}
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkValidToSubmit()) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/v2/public/contact`, prepareData())
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Tạo câu hỏi hoặc góp ý",
                    text: "Câu hỏi hoặc góp ý được tạo thành công !"
                })
                handleReset()
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Tạo câu hỏi hoặc góp ý",
                    text: "Câu hỏi hoặc góp ý không được tạo thành công !"
                })
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Vui lòng nhập đầy đủ thông tin !"
            })
            afterSubmit()
        }
    }
    const prepareData = () => {
        return {
            fullName: letterName,
            phoneNumber: letterPhone,
            email: letterEmail,
            title: letterTitle,
            content: letterContent
        }
    }
    
    // Validation
    const regexPatterns = {
        rEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        rPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,

    }
    const validateName = (value) => {
        let validate = {
            first: false,
            isValid: true,
            text: "..."
        }
        if (value === "") {
            validate.isValid = false
            validate.text = "Bạn chưa nhập họ và tên"
        }
        return validate;
    }
    const validateEmail = (value) => {
        let validate = {
            first: false,
            isValid: true,
            text: "..."
        }
        if (value === "") {
            validate.isValid = false
            validate.text = "Bạn chưa nhập email"
        }else if (!regexPatterns.rEmail.test(value)) {
            validate.isValid = false
            validate.text = "Bạn không nhập đúng định dạng email !"
        }
        return validate;
    }
    const validatePhone = (value) => {
        let validate = {
            first: false,
            isValid: true,
            text: "..."
        }
        if (value === "") {
            validate.isValid = false
            validate.text = "Bạn chưa nhập số điện thoại"
        }else if (!regexPatterns.rPhone.test(value)) {
            validate.isValid = false
            validate.text = "Số điện thoại bao gồm 10 chữ số và bắt đầu bằng 0"
        }
        return validate;
    }
    const validateTitle = (value) => {
        let validate = {
            first: false,
            isValid: true,
            text: "..."
        }
        if (value === "") {
            validate.isValid = false
            validate.text = "Bạn chưa nhập tiêu đề"
        }
        return validate;
    }
    const validateContent = (value) => {
        let validate = {
            first: false,
            isValid: true,
            text: "..."
        }
        if (value === "") {
            validate.isValid = false
            validate.text = "Bạn chưa nhập nội dung"
        }
        return validate;
    }
    const checkValidToSubmit = () => {
        return !vName.first && vName.isValid && vPhone.isValid && !vPhone.first && vContent.isValid && !vContent.first && vEmail.isValid && !vEmail.first && vTitle.isValid && !vTitle.first
    }
    const afterSubmit = () => {
        setState((prev) => {
            return {
                ...prev,
                vName: {...validateName(letterName)},
                vContent: {...validateContent(letterContent)},
                vPhone: {...validatePhone(letterPhone)},
                vEmail: {...validateEmail(letterEmail)},
                vTitle: {...validateTitle(letterTitle)}
            }
        })
    }

    return (<div className={clsx(styles.contact)}>
        <div className={clsx(styles.info, styles.contactPart)}>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408644!2d105.76842661474251!3d10.029933692830634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1634910577020!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0}} 
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
        <div className={clsx(styles.work, styles.contactPart)}>
            <h3 className={clsx(styles.title)}>Liên hệ !</h3>
            <div className={clsx(styles.scripts)}>Hãy thể hiện những thắc mắc của bạn ...</div>
            <div className={clsx(styles.define)}><i className="fa-solid fa-location-dot"></i> Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</div>
            <div className={clsx(styles.define)}><i className="fa-solid fa-envelope"></i> dhct@ctu.edu.vn</div>
            <div className={clsx(styles.define)}><i className="fa-solid fa-phone"></i> {`(84-292) 3832663`}</div>
            <div className={clsx(styles.define)}><i className="fa-solid fa-fax"></i> {`(84-292) 3838474`}</div>
            <hr></hr>
            <form className={clsx(styles.form)} onSubmit={(e) => handleSubmit(e)}>
                <div className={clsx(styles.formGroup)}>
                    <label className={clsx(styles.formGroupTitle)}>Họ tên <NRequire /></label>
                    <NInput classByParent={styles.formGroupControl} placeholder="Nguyễn Văn An" setValue={handleSetName} value={letterName}/>
                    <NValid text={vName.text} isValid={vName.first || vName.isValid} />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label className={clsx(styles.formGroupTitle)}>Email <NRequire /></label>
                    <NInput classByParent={styles.formGroupControl} placeholder="nguyenvanan@gmail.com" setValue={handleSetEmail} value={letterEmail}/>
                    <NValid text={vEmail.text} isValid={vEmail.first || vEmail.isValid} />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label className={clsx(styles.formGroupTitle)}>Số điện thoại <NRequire /></label>
                    <NInput classByParent={styles.formGroupControl} placeholder="036540xxxx" setValue={handleSetPhone} value={letterPhone}/>
                    <NValid text={vPhone.text} isValid={vPhone.first || vPhone.isValid} />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label className={clsx(styles.formGroupTitle)}>Tiêu đề <NRequire /></label>
                    <NInput classByParent={styles.formGroupControl} placeholder="Cách tìm kiếm dự án hiệu quả ..." setValue={handleSetTitle} value={letterTitle}/>
                    <NValid text={vTitle.text} isValid={vTitle.first || vTitle.isValid} />
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label className={clsx(styles.formGroupTitle)}>Nội dung <NRequire /></label>
                    <NInput classByParent={styles.formGroupControl} placeholder="Nội dụng ..." setValue={handleSetContent} value={letterContent}/>
                    <NValid text={vContent.text} isValid={vContent.first || vContent.isValid} />
                </div>
                <hr></hr>
                <div className={clsx(styles.formControl, styles.formGroup)}>
                    <NButton btnType={'success'} classByParent={styles.formBtn} clickFunc={() => {}} formType={'submit'}>Gửi</NButton>
                    <NButton btnType={'danger'} classByParent={styles.formBtn} clickFunc={handleReset} formType={'reset'}>Nhập lại</NButton>
                </div>
            </form>
        </div>
    </div>)
}

export default NContact