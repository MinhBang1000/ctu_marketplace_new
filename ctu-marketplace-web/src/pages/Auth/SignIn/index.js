import './index.css'

import React from 'react'
import { withAlert } from 'react-alert'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'

import { fields } from './fields'

import { useTranslation } from 'react-i18next'
import { login } from '../../../store/authSlice'

import googleLogo from '../../../assets/google-logo.png'
import environment from '../../../environments/environment'

// Custom
import {useStore, myLogin} from "../../../store/globalstate"

const SignIn = (props) => {
    
    const [formValues, setFormValues] = React.useState({});

    const dispatch = useDispatch();
    const { t } = useTranslation('common');

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setFormValues({
            ...formValues,
            [fieldName]: value
        });
    }
    // Custom here
    const [state, myDispatch] = useStore()

    const onSubmit = (e) => {
        dispatch(login(formValues))
            .then((response) => {
                if(response.error) {
                    alert('Tên đăng nhập hoặc mật khẩu không chính xác !!!')
                }
                const expiredTime = new Date().getTime() + (60000 * 30)
                localStorage.setItem('expiredTime', JSON.stringify(expiredTime));
                // Login successfully
                myDispatch(myLogin())
            })
            .catch((err) => {
                alert('error: ', err)
            });
        e.preventDefault();
    }

    const renderFields = () => {
        if(fields && fields.length > 0){
            return fields.map((field) => {
                const {
                    name,
                    type,
                    required,
                    className,

                } = field;
                return (
                    <div className='mb-3' key={name}>
                        <label 
                            className="form-label" 
                            htmlFor={name}>
                                { t(`login.form.${name}`) }
                        </label>
                        <input 
                            name={name} 
                            type={type} 
                            className={className} 
                            placeholder={ t(`login.form.${name}`) }
                            required={required}
                            onChange={handleChange}
                        />
                    </div>
                )
            })
        }

        return null;
    }

    return (
        <div className='container mt-4 mb-4'>
            <div className='row justify-content-center'>
                <div 
                    className='col-lg-4 mk-login'
                >
                    <div className='w-100'>
                        <h3 className='text-center mb-4'>{ t('login.title') }</h3>
                        <form onSubmit={onSubmit}>
                            { renderFields() }
                            <div className="mb-3 form-check">
                                <div className='col-sm'>
                                    <section className='d-flex gap-2'>
                                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                        <label className="form-check-label" htmlFor="exampleCheck2">{ t('login.form.labelRemember') }</label>
                                    </section>
                                </div>
                                {/* <Link 
                                    to={'/'} 
                                    className="fp col-sm"
                                >
                                    Quên mật khẩu
                                </Link>  */}
                            </div>
                            <div className="mb-3">
                                <>
                                    <button 
                                        className="btn btn-primary w-100"
                                        onClick={e => onSubmit(e)}
                                    >
                                        { t('login.form.btnLogin') }
                                    </button>
                                </>
                                
                                <>
                                    <div className='d-flex justify-content-between'>
                                        <p className='text-center text-primary'>{ t('login.form.labelHaveNotAccount') }</p>

                                        <Link 
                                            to={`/quen-mat-khau`}
                                            className="text-primary"
                                        >
                                            { t('login.form.forget-password') }
                                        </Link>
                                    </div>
                                    
                                    <Link 
                                        to={`/dang-ky`}
                                        className="btn btn-primary w-100"
                                    >
                                        <span style={{color: 'white'}}>{ t('login.form.btnSignup') }</span>
                                    </Link>
                                </>

                                <div>
                                    <a className="btn w-100" href={environment.url.GOOGLE_AUTH_URL}>
                                        <img src={googleLogo} alt="Google" width={50} /> 
                                        { t('login.form.log-in-with-google') }
                                    </a>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

const validate = formValues => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'Tên đăng nhập không được để trống'
    }
    if (!formValues.password) {
        errors.password = 'Mật khẩu không được để trống'
    }

    return errors;
}

const mapStateToProps = (state) => {
    return { 
        // isSignedIn: state.auth.isSignedIn,
    };
}

const formWrapped = reduxForm({
    form: 'loginForm',
    validate: validate
})(withAlert()(SignIn));

export default connect(
    mapStateToProps, 
    // { login, loaded }
    {}

)(formWrapped);