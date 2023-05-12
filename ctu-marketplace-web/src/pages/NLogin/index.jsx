import React from "react"
import clsx from "clsx"
import styles from "./NLogin.module.css"
import { useState } from "react"
import { useStore } from "../../store/globalstate"
import { myLogin } from "../../store/globalstate"
import axios from "axios"
import authHeader from "../../services/auth.header"
import Swal from "sweetalert2"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const NLogin = () => {
    // Init hooks
    const initState = {
        username: "",
        password: "",
        redirect: false,
        isLogin: true, // true is login , false is sign up
        isResearcher: false,
        isShow: false,
        // Signup
        fullName: '',
        email: '',
        phone: '',
        address: '',
        gender: 1, // 1 Men, 2 Women, 3 Other
        getNews: true, // always true
        dob: new Date(),
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
    const {username, password, redirect, isLogin, isResearcher, fullName, email,isShow, phone, address, gender, dob, getNews} = localState
    const [state, myDispatch] = useStore()
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
    const handleSetDob = (value) => {
        setState((prev) => {
            return {...prev, dob: value}
        })
    }
    const handleSetFullname = (value) => {
        setState((prev) => {
            return {...prev, fullName: value}
        })
    }
    const handleSetEmail = (value) => {
        setState((prev) => {
            return {...prev, email: value}
        })
    }
    const handleSetPhone = (value) => {
        setState((prev) => {
            return {...prev, phone: value}
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
    const handleSetUsername = (value) => {
        setState((prev) => {
            return {...prev, username: value}
        })
    }
    const handleSetPassword = (value) => {
        setState((prev) => {
            return {...prev, password: value}
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
        console.log(data)
        const url = isResearcher===true?`https://127.0.0.1:3001/api/v2/auth/sign-up/researcher`:`https://127.0.0.1:3001/api/v2/auth/sign-up/guest`
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
            handleSubmitLogin()
        }else{
            handleSubmitSignup()
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
            return {...prev, ...resetState}
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
    }
    const handleChangeRole = (value) => {
        setState((prev) => {
            return {...prev, isResearcher: (value === "true")}
        })
    }
    // Validation
    // Sub components
    const loginComponent = () =>{
        return (<>
            <h1 className={clsx(styles.title)}>Đăng nhập</h1>
            <div className={clsx(styles.formGroup)}>
                <label>Tên đăng nhập</label>
                <input placeholder="nguyenvana ..." value={username} type="text" required onChange={(e) => handleSetUsername(e.target.value)} />
            </div>
            <div className={clsx(styles.formGroup)}>
                <label>Mật khẩu</label>
                {
                    !isShow ? <i className="fa-solid fa-eye" onClick={() => setState((prev) => {return {...prev, isShow: true}})}></i> : <i className="fa-solid fa-eye-slash" onClick={() => setState((prev) => {return {...prev, isShow: false}})}></i>
                }
                <input placeholder="*************" value={password} type={!isShow ? 'password' : 'text'} required onChange={(e) => handleSetPassword(e.target.value)} />
            </div>
            {/* <div className={clsx(styles.link, styles.forgot)}><span>Quên mật khẩu</span></div> */}
            <button className={clsx(styles.btn, styles.submit)} type="submit" >Đăng nhập</button>
            <button className={clsx(styles.btn, styles.reset)} type="reset" onClick={handleReset} >Nhập lại</button>
            {/* Google Login Here */}
            <div className={clsx(styles.link, styles.signup)} onClick={() => handleChangeFeature(false)}><span>Bạn chưa có tài khoản ?</span></div>
        </>)
    }
    const signupComponent = () => {
        return (
            <>
                <h1 className={clsx(styles.title)}>Đăng ký</h1>
                <div className={clsx(styles.formGroup)}>
                    <label>Vai trò</label>
                    <select className={clsx(styles.select)} onChange={(e) => handleChangeRole(e.target.value)}>
                        <option value={false}>Khách</option>
                        <option value={true}>Nhà nghiên cứu</option>
                    </select>
                </div>
                {
                    isResearcher===false ? <>
                        <div className={clsx(styles.formGroup)}>
                            <label>Họ tên</label>
                            <input placeholder="Nguyễn Văn A" value={fullName} type="text" required onChange={(e) => handleSetFullname(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Email</label>
                            <input placeholder="nguyenvana@gmail.com" value={email} type="email" required onChange={(e) => handleSetEmail(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Số điện thoại</label>
                            <input placeholder="+8436540xxxx" value={phone} type="text" required onChange={(e) => handleSetPhone(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Địa chỉ</label>
                            <input placeholder="3/2, Xuân Khánh, Ninh Kiều, Cần Thơ" value={address} required type="text" onChange={(e) => handleSetAddress(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Giới tính</label>
                            <select className={clsx(styles.select)} onChange={(e) => handleSetGender(e.target.value)}>
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                                <option value={3}>Khác</option>
                            </select>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Tên đăng nhập</label>
                            <input placeholder="nguyenvana ..." value={username} required type="text" onChange={(e) => handleSetUsername(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Mật khẩu</label>
                            {
                                !isShow ? <i className="fa-solid fa-eye" onClick={() => setState((prev) => {return {...prev, isShow: true}})}></i> : <i className="fa-solid fa-eye-slash" onClick={() => setState((prev) => {return {...prev, isShow: false}})}></i>
                            }
                            <input placeholder="*************" value={password} type={!isShow ? 'password' : 'text'}  required onChange={(e) => handleSetPassword(e.target.value)} />
                        </div>
                    </> : <>
                        <div className={clsx(styles.formGroup)}>
                            <label>Họ tên</label>
                            <input placeholder="Lê Minh Bằng" value={fullName} type="text" required onChange={(e) => handleSetFullname(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Email</label>
                            <input placeholder="minhbang@gmail.com" value={email} type="email" required onChange={(e) => handleSetEmail(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Số điện thoại</label>
                            <input placeholder="+8436540xxxx" value={phone} type="text" required onChange={(e) => handleSetPhone(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Địa chỉ</label>
                            <input placeholder="3/2, Xuân Khánh, Ninh Kiều, Cần Thơ" value={address} required type="text" onChange={(e) => handleSetAddress(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Giới tính</label>
                            <select className={clsx(styles.select)} onChange={(e) => handleSetGender(e.target.value)}>
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                                <option value={3}>Khác</option>
                            </select>
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Ngày sinh</label>
                            <input value={dob} type="date" onChange={(e) => handleSetDob(e.target.value)} required />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Tên đăng nhập</label>
                            <input placeholder="nguyenvana ..." value={username} required type="text" onChange={(e) => handleSetUsername(e.target.value)} />
                        </div>
                        <div className={clsx(styles.formGroup)}>
                            <label>Mật khẩu</label>
                            {
                                !isShow ? <i className="fa-solid fa-eye" onClick={() => setState((prev) => {return {...prev, isShow: true}})}></i> : <i className="fa-solid fa-eye-slash" onClick={() => setState((prev) => {return {...prev, isShow: false}})}></i>
                            }
                            <input placeholder="*************" value={password} type={!isShow ? 'password' : 'text'} required onChange={(e) => handleSetPassword(e.target.value)} />
                        </div>
                    </>
                }
                <button className={clsx(styles.btn, styles.submit)} type="submit">Đăng ký</button>
                <button className={clsx(styles.btn, styles.reset)} onClick={handleReset} >Nhập lại</button>
                <div className={clsx(styles.link, styles.signup)} onClick={() => handleChangeFeature(true)}><span>Bạn đã có tài khoản ?</span></div>
            </>
        )
    }
    // Rendering
    return (<>
        {redirect && <Redirect to="/" />}
        <div className={clsx(styles.auth)}  style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/ctu.jpg')`}}>
        <div className={clsx(styles.info)}>
            
        </div>
        <form className={clsx(styles.content)} onSubmit={(e)=>handleEnterSubmit(e)}>
            {
                isLogin === true ? loginComponent() : signupComponent()
            }
        </form>
    </div>
    </>)
}

export default NLogin