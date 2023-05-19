import React from "react"
import clsx from "clsx"
import styles from "./NLogin.module.css"
import { useState } from "react"
import { reCheckAuth, useStore } from "../../store/globalstate"
import { myLogin } from "../../store/globalstate"
import axios from "axios"
import authHeader from "../../services/auth.header"
import Swal from "sweetalert2"
import { Redirect } from "react-router-dom/cjs/react-router-dom"
import NValid from "../../components/NValid"
import { useTransition, animated } from "@react-spring/web"

const NLogin = () => {
    // Init hooks
    const initState = {
        username: "",
        password: "",
        redirect: false,
        isLogin: true, // true is login , false is sign up
        isResearcher: false,
        isShow: false,
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
        // Signup
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        getNews: true, // always true
        dob: new Date(),
    }
    const resetValidateState = {
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
    }
    const resetState = {
        isShow: false,
        username: "",
        password: "",
        // Signup
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        getNews: true, // always true
        dob: new Date(),
    }
    const [localState, setState] = useState(initState)
    const {username, password, vUsername, vPassword, vFullname, vEmail, vAddress, vPhone, redirect, isLogin, isResearcher, fullName, email,isShow, phone, address, gender, dob, getNews} = localState
    const [state, myDispatch] = useStore()
    const {
        logStatus
    } = state
    const transitions = useTransition(isLogin, {
        from: {opacity: 0},
        enter: {opacity: 1}
    })
    // Popup
    const popupLogin = (check) => {
        if (check) {
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập',
                text: 'Tài khoản đã đăng nhập thành công!'
              })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập',
                text: 'Xác thực tài khoản không thành công! Xin kiểm tra lại tên tài khoản hoặc mật khẩu'
              })
        }
    }
    const popupSignup = (check) => {
        if (check) {
            Swal.fire({
                icon: 'success',
                title: 'Đăng ký',
                text: 'Tài khoản đã đăng ký thành công! Vui lòng chờ xét duyệt từ quản trị viên để có thể sử dụng'
              })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký',
                text: 'Tài khoản đăng ký không thành công! Tên tài khoản đã tồn tại'
              })
        }
    }
    // Handle
    const handleResetValidate = () => {
        setState((prev) => {
            return {...prev, ...resetValidateState}
        })
    }
    const handleSetDob = (value) => {
        setState((prev) => {
            return {...prev, dob: value}
        })
    }
    const handleSetFullname = (value) => {
        setState((prev) => {
            return {...prev, fullName: value, vFullname: {...validateFullname(value)}}
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
            return {...prev, address: value, vAddress: {...validateAddress(value)}}
        })
    }
    const handleSetGender = (value) => {
        setState((prev) => {
            return {...prev, gender: parseInt(value)}
        })
    }
    const handleSetUsername = (value) => {
        setState((prev) => {
            return {...prev, username: value, vUsername: { ...prev.vUsername, ...validateUsername(value)}}
        })
    }
    const handleSetPassword = (value) => {
        setState((prev) => {
            return {...prev, password: value, vPassword: {...prev.vPassword, ...validatePassword(value)}}
        })
    }
    const handleSubmitSignup = () => {
        let data = {}
        if (isResearcher === true) {
            data = {
                username,
                password,
                fullName,
                dob,
                address,
                gender,
                email,
                phoneNumber: phone
            }
        }else {
            data = {
                username,
                password,
                fullName,
                address,
                gender,
                email,
                phoneNumber: phone, 
                getNews
            }
        }
        const url = isResearcher===true?`https://marketplace.ctu.edu.vn/api/v2/auth/sign-up/researcher`:`https://marketplace.ctu.edu.vn/api/v2/auth/sign-up/guest`
        axios.post(url, data)
        .then((res) => {
            if (!isResearcher) {
                handleSubmitLogin()    
            }else{
                popupSignup(true)
                handleReset()
            }
        })
        .catch((err) => {
            console.log(err);
            popupSignup(false)
        })
    }
    const handleEnterSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            if (handleCheckValidLogin()) {
                handleSubmitLogin()
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Nhập thông tin",
                    text: "Thông tin đăng nhập chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
                })
                handleValidationWhenSubmit()
            }
        }else{
            if (handleCheckValidSignUp()) {
                handleSubmitSignup()
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Nhập thông tin",
                    text: "Thông tin đăng nhập chưa đầy đủ hoặc chưa đúng! Vui lòng nhập lại"
                })
                handleValidationWhenSubmit()
            }
        }
    }
    const handleSubmitLogin = () => {
        const data = {
            username,
            password
        }
        axios.post(`https://marketplace.ctu.edu.vn/api/v2/auth/login`, data)
        .then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.data.token))
            // Setting local variables
            axios.get(`https://marketplace.ctu.edu.vn/api/v2/auth?username=${username}`, { headers: authHeader()})
            .then(res => {
                localStorage.setItem('userData', JSON.stringify(res.data))
                const expiredTime = new Date().getTime() + (60000 * 30)
                localStorage.setItem('expiredTime', JSON.stringify(expiredTime));
                // Setup global state for logStatus
                myDispatch(myLogin())
                myDispatch(reCheckAuth())
                popupLogin(true)
                // Redirect to home page
                setState((prev) => {
                    return {...prev, redirect: true}
                })
            })
            .catch(err => {
                popupLogin(false)
            })
        })
        .catch(err => {
            popupLogin(false)
        })
    }
    const handleReset = () => {
        setState((prev) => {
            return {...prev, ...resetState, ...resetValidateState}
        })
    }
    const handleChangeFeature = (value) => {
        if (value === true) {
            setState((prev) => {
                return {...prev, isLogin: true}
            })
        }else {
            setState((prev) => {
                return {...prev, isLogin: false}
            })
        }
        handleReset()
    }
    const handleChangeRole = (value) => {
        setState((prev) => {
            return {...prev, isResearcher: (value === "true")}
        })
    }
    // Validation
    const regexPatterns = {
        rEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        rPhone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        rPassword: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    }
    const validateFullname = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập họ và tên !"
            validate.isValid = false 
        }else if (value.length > 250) {
            validate.text = "Họ và tên được nhập nhỏ hơn 250 ký tự !"
            validate.isValid = false
        }
        return validate
    }
    const validateEmail = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập địa chỉ Email !"
            validate.isValid = false 
        }else if (!regexPatterns.rEmail.test(value)) {
            validate.text = "Bạn chưa nhập đúng định dạng Email !"
            validate.isValid = false  
        }else if (value.length > 250) {
            validate.text = "Email cần nhỏ hơn 250 ký tự ! Vui lòng nhập lại"
            validate.isValid = false             
        } 
        return validate
    }
    const validateAddress = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập địa chỉ !"
            validate.isValid = false 
        }else if (value.length > 250) {
            validate.text = "Địa chỉ cần nhỏ hơn 250 ký tự ! Vui lòng nhập lại"
            validate.isValid = false             
        } 
        return validate
    }
    const validatePhone = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập số điện thoại !"
            validate.isValid = false 
        }else if (!regexPatterns.rPhone.test(value)) {
            validate.text = "Số điện thoại bao gồm 10 chữ số và bắt đầu bằng 0 !"
            validate.isValid = false 
        }
        return validate
    }
    const validateUsername = (value) => {
        let validate = {
            first: false,
            text: "...",
            isValid: true
        }
        if (value === "") {
            validate.text = "Bạn chưa nhập tên tài khoản !"
            validate.isValid = false 
        }else if (value.length > 250) {
            validate.text = "Tên đăng nhập cần nhỏ hơn 250 ký tự ! Vui lòng nhập lại"
            validate.isValid = false             
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
        }else if (!isLogin && !regexPatterns.rPassword.test(value)) {
            validate.text = "Mật khẩu từ 6-16 ký tự, bao gỗm chữ cái, số và ký tự đặc biệt !"
            validate.isValid = false
        }
        return validate
    }
    const handleCheckValidLogin = () => {
        return vUsername.isValid && !vUsername.first && vPassword.isValid && !vPassword.first
    }
    const handleCheckValidSignUp = () => {
        let check = true
        check = vUsername.isValid && !vUsername.first && vPassword.isValid && !vPassword.first
        check = check && vAddress.isValid && !vAddress.first && vEmail.isValid && !vEmail.first
        check = check && vPhone.isValid && !vPhone.first && vFullname.isValid && !vFullname.first
        return check
    }
    const handleValidationWhenSubmit = () => {
        setState((prev => {
            return {
                ...prev,
                vUsername: {...validateUsername(prev.username)},
                vPassword: {...validatePassword(prev.password)},
                vFullname: {...validateFullname(prev.fullName)},
                vAddress: {...validateAddress(prev.address)},
                vPhone: {...validatePhone(prev.phone)},
                vEmail: {...validateEmail(prev.email)}
            }
        }))
    }
    // Sub components
    const loginComponent = () =>{
        return (<div className={clsx(styles.login)}>
            <h3 className={clsx(styles.title)}>Đăng nhập !</h3>
            <div className={clsx(styles.scripts)}>Hãy để mọi người biết đến nghiên cứu của bạn ...</div>
            <div className={clsx(styles.formGroup)}>
                <label>Tên đăng nhập</label>
                <input placeholder="nguyenvana ..." value={username} type="text"  onChange={(e) => handleSetUsername(e.target.value)} />
                <NValid isValid={vUsername.first || vUsername.isValid} text={vUsername.text}/>
            </div>
            <div className={clsx(styles.formGroup)}>
                <label>Mật khẩu</label>
                {
                    !isShow ? <i className="fa-solid fa-eye" onClick={() => setState((prev) => {return {...prev, isShow: true}})}></i> : <i className="fa-solid fa-eye-slash" onClick={() => setState((prev) => {return {...prev, isShow: false}})}></i>
                }
                <input placeholder="*************" value={password} type={!isShow ? 'password' : 'text'}  onChange={(e) => handleSetPassword(e.target.value)} />
                <NValid isValid={vPassword.first || vPassword.isValid} text={vPassword.text}/>
            </div>
            {/* <div className={clsx(styles.link, styles.forgot)}><span>Quên mật khẩu</span></div> */}
            <hr></hr>
            <button className={clsx(styles.btn, styles.submit)} type="submit" >Đăng nhập</button>
            <button className={clsx(styles.btn, styles.reset)} type="reset" onClick={handleReset} >Nhập lại</button>
            {/* Google Login Here */}
            <div className={clsx(styles.link, styles.signup)} onClick={() => handleChangeFeature(false)}><span>Bạn chưa có tài khoản ?</span></div>
        </div>)
    }
    const signupComponent = () => {
        return (
            <div className={clsx(styles.register)}>
                <h3 className={clsx(styles.title)}>Đăng ký !</h3>
                <div className={clsx(styles.scripts)}>Khởi tạo tài khoản của bạn ...</div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Vai trò</label>
                        <select className={clsx(styles.select)} onChange={(e) => handleChangeRole(e.target.value)}>
                            <option value={false}>Khách</option>
                            <option value={true}>Nhà nghiên cứu</option>
                        </select>
                        <NValid isValid={true} text={"..."}/>
                    </div>
                <div className={clsx(styles.registerGroup)}>
                    <div className={clsx(styles.formGroup)}>
                        <label>Họ tên <strong className="text-danger">{`(*)`}</strong></label>
                        <input placeholder="Nguyễn Văn A" value={fullName} type="text"  onChange={(e) => handleSetFullname(e.target.value)} />
                        <NValid isValid={vFullname.first || vFullname.isValid} text={vFullname.text}/>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Email <strong className="text-danger">{`(*)`}</strong></label>
                        <input placeholder="nguyenvana@gmail.com" value={email} type="email"  onChange={(e) => handleSetEmail(e.target.value)} />
                        <NValid isValid={vEmail.first || vEmail.isValid} text={vEmail.text}/>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Số điện thoại <strong className="text-danger">{`(*)`}</strong></label>
                        <input placeholder="+8436540xxxx" value={phone} type="text"  onChange={(e) => handleSetPhone(e.target.value)} />
                        <NValid isValid={vPhone.first || vPhone.isValid} text={vPhone.text}/>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Địa chỉ <strong className="text-danger">{`(*)`}</strong></label>
                        <input placeholder="3/2, Xuân Khánh, Ninh Kiều, Cần Thơ" value={address}  type="text" onChange={(e) => handleSetAddress(e.target.value)} />
                        <NValid isValid={vAddress.first || vAddress.isValid} text={vAddress.text}/>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Giới tính</label>
                        <select className={clsx(styles.select)} onChange={(e) => handleSetGender(e.target.value)}>
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                            <option value={3}>Khác</option>
                        </select>
                        <NValid isValid={true} text={"..."}/>
                    </div>
                    <div className={clsx(styles.formGroup)}>
                        <label>Ngày sinh</label>
                        <input value={dob} type="date" onChange={(e) => handleSetDob(e.target.value)}  />
                        <NValid isValid={true} text={"..."}/>
                    </div>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label>Tên đăng nhập <strong className="text-danger">{`(*)`}</strong></label>
                    <input placeholder="nguyenvana ..." value={username}  type="text" onChange={(e) => handleSetUsername(e.target.value)} />
                    <NValid isValid={vUsername.first || vUsername.isValid} text={vUsername.text}/>
                </div>
                <div className={clsx(styles.formGroup)}>
                    <label>Mật khẩu <strong className="text-danger">{`(*)`}</strong></label>
                    {
                        !isShow ? <i className="fa-solid fa-eye" onClick={() => setState((prev) => {return {...prev, isShow: true}})}></i> : <i className="fa-solid fa-eye-slash" onClick={() => setState((prev) => {return {...prev, isShow: false}})}></i>
                    }
                    <input placeholder="*************" value={password} type={!isShow ? 'password' : 'text'}   onChange={(e) => handleSetPassword(e.target.value)} />
                    <NValid isValid={vPassword.first || vPassword.isValid} text={vPassword.text}/>
                </div>
                <hr></hr>
                <button className={clsx(styles.btn, styles.submit)} type="submit">Đăng ký</button>
                <button className={clsx(styles.btn, styles.reset)} type="reset" onClick={handleReset} >Nhập lại</button>
                <div className={clsx(styles.link, styles.signup)} onClick={() => handleChangeFeature(true)}><span>Bạn đã có tài khoản ?</span></div>
            </div>
        )
    }
    // Rendering
    return (<>
        {redirect && <Redirect to="/" />}
        {logStatus && <Redirect to="/" />}
        <div className={clsx(styles.auth)}  >
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.info)}
                style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/ctu.jpg')`}}
            >

            </div>
            <form className={clsx(styles.content)} onSubmit={(e)=>handleEnterSubmit(e)}>
                {
                    transitions((style, item) => {
                        return <animated.div style={style}>{item ? loginComponent() : signupComponent()}</animated.div>
                    })
                }
            </form>
        </div>
    </div>
    </>)
}

export default NLogin