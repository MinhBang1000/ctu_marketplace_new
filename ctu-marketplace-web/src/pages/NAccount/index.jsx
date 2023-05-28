import React from "react"
import clsx from "clsx"
import styles from "./NAccount.module.css"
import { useStore, myLogin, reCheckAuth } from "../../store/globalstate"
import { Redirect } from "react-router-dom"
import { useRef } from "react"
import NRequire from "../../components/NRequire"
import NSelect from "../../components/NSelect"
import NInput from "../../components/NInput"
import NValid from "../../components/NValid"
import NButton from "../../components/NButton"
import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import authHeader from "../../services/auth.header"
import { useEffect } from "react"

const NAccount = () => {
    // Data
    const initState = {
        username: "",
        image: '',
        password: "",
        oldPassword: "",
        confirm: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        dob: new Date(),
        // Validate
        vUsername: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPassword: {
            first: true,
            isValid: true,
            text: '...'
        },
        vOldPassword: {
            first: true,
            isValid: true,
            text: '...'
        },
        vFullname: {
            first: true,
            isValid: true,
            text: '...'
        },
        vAddress: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPhone: {
            first: true,
            isValid: true,
            text: '...'
        },
        vEmail: {
            first: true,
            isValid: true,
            text: '...'
        },
        vConfirm: {
            first: true,
            isValid: true,
            text: '...'
        },
        isGetUser: false,
        currentUser: null
    }
    const resetState = {
        username: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        oldPassword: '',
        confirm: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        dob: new Date(),
    }
    const resetPassword = {
        password: "",
        oldPassword: "",
        confirm: '',
    }
    const resetInformations = {
        username: "",
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        dob: new Date(),
    }
    const resetValidatePasswordState = {
        vConfirm: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPassword: {
            first: true,
            isValid: true,
            text: '...'
        },
        vOldPassword: {
            first: true,
            isValid: true,
            text: '...'
        },
    }
    const resetValidateState = {
        vUsername: {
            first: true,
            isValid: true,
            text: '...'
        },
        vFullname: {
            first: true,
            isValid: true,
            text: '...'
        },
        vAddress: {
            first: true,
            isValid: true,
            text: '...'
        },
        vPhone: {
            first: true,
            isValid: true,
            text: '...'
        },
        vEmail: {
            first: true,
            isValid: true,
            text: '...'
        }
    }
    // Hooks
    const [state, myDispatch] = useStore()
    const {
        logStatus
    } = state 
    const [localState, setState] = useState(initState)
    const {
        image,
        username,
        password,
        confirm,
        vConfirm,
        oldPassword,
        vOldPassword,
        fullName,
        address,
        email,
        phone,
        gender,
        dob,
        vUsername,
        vFullname,
        vPassword,
        vEmail,
        vPhone,
        vAddress,
        isGetUser,
        currentUser
    } = localState
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/auth?username=${user.data.username}`, { headers: authHeader()})
        .then(res => {
            localStorage.setItem('userData', JSON.stringify(res.data))
            // Setup global state for logStatus
            myDispatch(myLogin())
            myDispatch(reCheckAuth())
            // Redirect to home page
            const myUser = res.data.data
            setState((prev) => {
                return {
                    ...prev, 
                    currentUser: myUser,
                    image: myUser.avatar,
                    username: myUser.username,
                    fullName: myUser.fullName,
                    address: myUser.address,
                    email: myUser.email,
                    phone: myUser.phoneNumber,
                    gender: myUser.gender ? myUser.gender : 1,
                    dob: myUser.dob,
                }
            })
        })
        .catch(err => {
        })
    }, [isGetUser])
    const avatarInputRef = useRef()
    // Trigger
    const triggerAvatar = () => {
        avatarInputRef.current.click()
    }


    // Tools 
    const getExtension = (filename) => {
        let parts = filename.split('.');
        return parts[parts.length - 1];
    }

    // Handle
    const handleResetPassword = () => {
        setState((prev) => {
            return {...prev, ...resetPassword,...resetValidatePasswordState, }
        })
    }
    const handleResetInfo = () => {
        setState((prev) => {
            return {...prev, ...resetInformations, ...resetValidateState}
        })
    }
    const handleDate = (value) => {
        return new Date(value).toLocaleDateString("en-GB")
    }
    const handleSetFullName = (value) => {
        setState((prev) => {
            return {...prev, fullName: value}
        })
    }
    const handleSetEmail = (value) => {
        setState((prev) => {
            return {...prev, email: value, vEmail: {...validateEmail(value)}}
        })
    }
    const handleSetPhone = (value) => {
        setState((prev) => {
            return {...prev, phone: value, vPhone: {...validatePhone(value)}}
        })
    }
    const handleSetAddress = (value) => {
        setState((prev) => {
            return {...prev, address: value}
        })
    }
    const handleSetGender = (value) => {
        setState((prev) => {
            return {...prev, gender: parseInt(value)}
        })
    }
    const handleSetDob = (value) => {
        setState((prev) => {
            return {...prev, dob: value}
        })
    }
    const handleSetFile = (files) => {
        if (files.length > 0) {
            const file = files[0]
            if (validateImage(file)) {
                let formData = new FormData()
                formData.append("file", file)
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/upload-image`, formData, { headers: authHeader() })
                .then((res) => {
                    const fileName = res.data.data.name
                    axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/users/update-image?imageName=${fileName}`, null, {
                        headers: authHeader()
                    })
                    .then((res) => {
                        const user = JSON.parse(localStorage.getItem('userData'))
                        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v2/auth?username=${user.data.username}`, { headers: authHeader()})
                        .then(res => {
                            localStorage.setItem('userData', JSON.stringify(res.data))
                            // Setup global state for logStatus
                            myDispatch(myLogin())
                            myDispatch(reCheckAuth())
                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật ảnh',
                                text: 'Cập nhật ảnh thành công!'
                            })
                            // Redirect to home page
                            setState((prev) => {
                                return {...prev, image: res.data.data.avatar}
                            })
                        })
                        .catch(err => {
                            Swal.fire({
                                icon: "error",
                                title: "Cập nhật ảnh",
                                text: "Cập nhật ảnh không thành công! Vui lòng kiểm tra lại định dạng *.jpg"
                            })
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Cập nhật ảnh",
                            text: "Cập nhật ảnh không thành công! Vui lòng kiểm tra lại định dạng *.jpg"
                        })
                    })
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Cập nhật ảnh",
                        text: "Cập nhật ảnh không thành công! Vui lòng kiểm tra lại định dạng *.jpg"
                    })
                })
            }
        }
    }
    const handleSetConfirm = (value) => {
        setState((prev) => {
            return {...prev, confirm: value, vConfirm: {...validatePassword(value)}}
        })
    }
    const handleSetOldPassword = (value) => {
        setState((prev) => {
            return {...prev, oldPassword: value, vOldPassword: {...validatePassword(value)}}
        })
    }
    const handleSetPassword = (value) => {
        setState((prev) => {
            return {...prev, password: value, vPassword: {...validatePassword(value)}}
        })
    }
    // Validation
    const regexPatterns = {
        rEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        rPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        rPassword: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    }
    const replaceAllSpace = (str) => {
        if (str) {
            return str.replace(/\s/g, '');
        }
        return ""
    }
    const validateImage = (value) => {
        let check = true
        if (value.size > 10485760) {
            check = false
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật ảnh',
                text: 'Ảnh của bạn quá lớn > 10MB! Vui lòng chọn lại ảnh'
            })
        }else if (getExtension(value.name).toLowerCase() !== "jpg") {
            check = false
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật ảnh',
                text: 'Ảnh cần phải định dạng JPG! Vui lòng chọn lại ảnh'
            })
        }
        return check
    }
    const validateEmail = (value) => {
        let validate = {
            first:  false,
            isValid: true,
            text: '...'
        }
        if (value!=="") {
            if (!regexPatterns.rEmail.test(value)) {
                validate.text = "Bạn chưa nhập đúng định dạng Email !"
                validate.isValid = false  
            }
        }
        return validate
    }
    const validatePhone = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value !== "") {
            if (!regexPatterns.rPhone.test(value)) {
                validate.text = "Số điện thoại bao gồm 10 chữ số và bắt đầu bằng 0 !"
                validate.isValid = false 
            }
        }
        return validate
    }
    const validatePassword = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập mật khẩu !"
            validate.isValid = false 
        }else if (!regexPatterns.rPassword.test(value)) {
            validate.text = "Mật khẩu từ 6-16 ký tự, bao gỗm chữ cái, số và ký tự đặc biệt !"
            validate.isValid = false
        }
        return validate
    }
    const checkValidInfoSubmit = () => {
        return vEmail.isValid && vPhone.isValid
    }
    const checkValidPasswordSubmit = () => {
        return  confirm === password && !vOldPassword.first && vOldPassword.isValid && !vConfirm.first && vConfirm.isValid && !vPassword.first && vPassword.isValid
    }
    
    // JSON
    const prepareDataInfo = () => {
        return {
            fullName: replaceAllSpace(fullName).length!==0 && fullName!==currentUser.fullName ? fullName : '' ,
            phoneNumber: replaceAllSpace(phone).length!==0 && phone!==currentUser.phoneNumber ? phone : '',
            address: replaceAllSpace(address).length!==0 && address!==currentUser.address ? address : '',
            gender: gender,
            email: replaceAllSpace(email).length!==0 && email!==currentUser.email ? email : '',
            dob: dob
        }
    }
    const prepareDataPassword = () => {
        return {
            newPassword: password,
            oldPassword: oldPassword
        }
    }

    // Submit
    const handleAfterInfoSubmit = () => {
        setState((prev) => {
            return {...prev, ...resetValidateState}
        })
    }
    const handleInfoSubmit = () => {
        setState((prev) => {
            return {...prev, vEmail: validateEmail(prev.email), vPhone: validatePhone(prev.phone)}
        })
    }
    const handleInformationsSubmit = () => {
        if (checkValidInfoSubmit()) {
            let json = prepareDataInfo()
            axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/users/update-informations`, json, {headers:authHeader()})
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: "Cập nhật thông tin cá nhân",
                    text: 'Cập nhật thành công!'
                })
                setState((prev) => {
                    return {...prev, isGetUser: !prev.isGetUser}
                })
                handleAfterInfoSubmit()
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: "Cập nhật thông tin cá nhân",
                    text: 'Cập nhật không thành công!'
                })
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Nhập thông tin",
                text: "Thông tin chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
            })
            handleInfoSubmit()
        }
    }
    const handleAfterPasswordSubmit = () => {
        setState((prev) => {
            return {...prev, ...resetValidatePasswordState, ...resetPassword}
        })
    }
    const handleSubmitPasswordError = () => {
        setState((prev) => {
            return {
                ...prev,
                vPassword: {...validatePassword(password)},
                vOldPassword: {...validatePassword(oldPassword)},
                vConfirm: {...validatePassword(confirm)},
            }
        })
    }
    const handlePasswordSubmit = () => {
        if (checkValidPasswordSubmit()) {
            let json = prepareDataPassword()
            axios.put(`${process.env.REACT_APP_BASE_URL}/api/v3/users/update-password/${currentUser.id}`, json, { headers: authHeader() })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thay đổi mật khẩu',
                    text: 'Mật khẩu được thay đổi thành công!'
                })
                handleAfterPasswordSubmit()
            }) 
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Thay đổi mật khẩu',
                    text: 'Mật khẩu thay đổi không thành công! Vui lòng kiểm tra lại mật khẩu cũ'
                })                
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Thay đổi mật khẩu',
                text: 'Mật khẩu thay đổi không thành công! Vui lòng kiểm tra mật khẩu xác nhận có trúng khớp'
            })               
            handleSubmitPasswordError()
        }
    }

    const userAvatar = () => {
        if (image && image.substring(0,5) === "https") {
            return `${image}`
        }
        return `${process.env.REACT_APP_BASE_URL}/api/v3/projects/view-image/${image}`
    }

    return (
    <>
        { !logStatus && <Redirect to="/" />  }
        <div className={clsx(styles.account)}>
            <div className={clsx(styles.introduction, styles.accountPart)}>
                <div className={clsx(styles.avatar)}>
                    <img 
                        src={!image ? `${process.env.PUBLIC_URL}/images/avatar.jpg` : userAvatar()}
                        className={clsx(styles.upload)}
                    />
                    <div className={clsx(styles.btnUpload)} onClick={triggerAvatar}>
                        <i className="fa-solid fa-camera"></i>
                    </div>
                    <input 
                        type="file"
                        accept="image/jpeg" 
                        onChange={(e) => handleSetFile(e.target.files)}
                        ref={avatarInputRef}
                    />
                </div>
                <div className={clsx(styles.review, styles.list)}>
                    <div className={styles.item}><i className="fa-solid fa-user"></i>{currentUser && currentUser.fullName}</div>
                    <div className={styles.item}><i className="fa-solid fa-envelope"></i>{currentUser && currentUser.email}</div>
                    <div className={styles.item}><i className="fa-solid fa-phone"></i>{currentUser && currentUser.phoneNumber}</div>
                    <div className={styles.item}><i className="fa-sharp fa-solid fa-location-dot"></i>{currentUser && currentUser.address}</div>
                    <div className={styles.item}><i className="fa-solid fa-person"></i>
                        {currentUser && currentUser.gender === 1 && "Nam"}
                        {currentUser && currentUser.gender === 2 && "Nữ"}
                        {currentUser && currentUser.gender === 3 && "Khác"}
                    </div>
                    {/* <i className="fa-solid fa-venus"></i> */}
                    <div className={styles.item}><i className="fa-solid fa-cake-candles"></i>{currentUser && handleDate(currentUser.dob)}</div>
                </div>
            </div>
            
            <div className={clsx(styles.informations, styles.accountPart)}>
                <h3 className={clsx(styles.title)}>Thông tin cá nhân !</h3>
                <div className={styles.script}>Cập nhật thông tin cá nhân của bạn ...</div>
                <form className={clsx(styles.form)} onSubmit={(e) => {
                    e.preventDefault()
                    handleInformationsSubmit()
                }}>
                    
                    <div className={clsx(styles.formGroup)}>
                        <label>Họ tên</label>
                        <NInput classByParent={styles.input} placeholder={currentUser && currentUser.fullName} 
                            setValue={handleSetFullName} value={fullName}
                        />
                        <NValid isValid={true} text={"werqwrqewrqwerqwwr"} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Email</label>
                        <NInput classByParent={styles.input}  placeholder={currentUser && currentUser.email} 
                            setValue={handleSetEmail} value={email}
                        />
                        <NValid isValid={vEmail.first || vEmail.isValid} text={vEmail.text} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Số điện thoại</label>
                        <NInput classByParent={styles.input}  placeholder={currentUser && currentUser.phoneNumber}  
                            setValue={handleSetPhone} value={phone}
                        />
                        <NValid isValid={vPhone.first || vPhone.isValid} text={vPhone.text} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Địa chỉ</label>
                        <NInput classByParent={styles.input}  placeholder={currentUser && currentUser.address}  
                            setValue={handleSetAddress} value={address}
                        />
                        <NValid isValid={true} text={"werqwrqewrqwerqwwr"} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Giới tính</label>
                        <NSelect classByParent={styles.input}
                            setValue={handleSetGender} value={gender}
                        >
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                            <option value={3}>Khác</option>
                        </NSelect>
                        <NValid isValid={true} text={"werqwrqewrqwerqwwr"} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Ngày sinh</label>
                        <NInput classByParent={styles.input} type={'date'} 
                            value={dob} setValue={handleSetDob}
                        />
                        <NValid isValid={true} text={"werqwrqewrqwerqwwr"} />
                    </div>
                    <hr></hr>
                    <div className={clsx(styles.formGroup, styles.formControl)}>
                        <NButton
                            btnType={'success'}
                            formType={'submit'}
                            clickFunc={() => {}}
                            classByParent={styles.button}
                        >Lưu</NButton>
                    </div>
                </form>
            </div>

            <div className={clsx({
                [styles.password]: true, 
                [styles.accountPart]: true,
                [styles.disable]: currentUser && currentUser.provider !== "local"
            })}>
                <h3 className={clsx(styles.title)}>Thay đổi mật khẩu !</h3>
                <div className={styles.script}>Thường xuyên thay đổi mật khẩu giúp tăng cường bảo mật ...</div>
                <form className={clsx(styles.form)}
                    onSubmit={(e) => { 
                        e.preventDefault() 
                        handlePasswordSubmit()
                    }}
                >
                    <div className={clsx(styles.formGroup)}>
                        <label>Mật khẩu cũ <NRequire /></label>
                        <NInput classByParent={styles.input} type={'password'} setValue={handleSetOldPassword} value={oldPassword} placeholder={"*****************"}/>
                        <NValid isValid={vOldPassword.first || vOldPassword.isValid} text={vOldPassword.text} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Mật khẩu mới <NRequire /></label>
                        <NInput classByParent={styles.input} type={'password'} setValue={handleSetPassword} value={password}  placeholder={"*****************"}/>
                        <NValid isValid={vPassword.first || vPassword.isValid} text={vPassword.text} />
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Xác nhận mật khẩu <NRequire /></label>
                        <NInput classByParent={styles.input} type={'password'} setValue={handleSetConfirm} value={confirm}  placeholder={"*****************"}/>
                        <NValid isValid={vConfirm.first || vConfirm.isValid} text={vConfirm.text} />
                    </div>
                    <hr></hr>
                    <div className={clsx(styles.formGroup, styles.formControl)}>
                        <NButton
                            btnType={'success'}
                            formType={'submit'}
                            classByParent={styles.button}
                            clickFunc={() => {}}
                        >Lưu</NButton>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default NAccount