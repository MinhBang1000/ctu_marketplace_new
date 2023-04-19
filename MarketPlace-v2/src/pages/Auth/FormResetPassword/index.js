import '../SignIn/index.css';

import { useState } from "react";
import { Link } from "react-router-dom";

import { retrieveUserByUsername } from '../../../store/admin.userSlice';
import { useDispatch } from 'react-redux';
import { sendResetPasswordCode } from '../../../store/authSlice';

import Form from './Form'
import Modal from './Modal'
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Forgot = () => {

    const [username, setUsername] = useState('');
    const [validate, setValidate] = useState({});
    const [showModal, setShowModal] = useState({
        code: false,
        password: false
    });
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation('common');

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            username: {
                value: username,
                isRequired: true,
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {
            setLoading(true);
            dispatch(retrieveUserByUsername(username))
            .then(res => {
                const email = res.payload.email;

                dispatch(sendResetPasswordCode(username))
                .then(() => {
                    setLoading(false);
                    alert('Link đặt lại mật khẩu đã được gửi đến ' + email);
                    setValidate({});
                    setUsername('');
    
                    setShowModal(previousState => ({...previousState, code: true}))
                })
            })
        }
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="col-lg-4 mx-auto">
                    <div className="auth-body mx-auto text-center">
                        <h3 className='text-center mb-4'>{ t('forgetPassword.form.title') }</h3>
                        <div className="auth-form-container text-start">
                            <form className="mk-login" onSubmit={forgotPassword} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="text"
                                        className={`form-control ${validate.validate && validate.validate.username ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="username"
                                        value={username}
                                        placeholder={t('forgetPassword.form.username')}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''}
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 theme-btn mx-auto"
                                    >
                                        {
                                            isLoading
                                            ? (
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            )
                                            : t('forgetPassword.form.btnOk')

                                        }
                                        
                                    </button>
                                </div>
                            </form>

                            <hr />
                            <div 
                                className="auth-option text-center pt-2"
                            >
                                <Link 
                                    className="text-primary" 
                                    to="/dang-nhap"
                                >
                                    { t('forgetPassword.form.btnBack') }
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
            <Modal 
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
}

export default Forgot;