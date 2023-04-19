import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { updatePassword, verifyResetPasswordCode } from '../../../store/authSlice';

const FIELD_CODE = 'code'
const FIELD_PASSWORD = 'password'

const CustomModal = ({ showModal, setShowModal }) => {
  
    const [value, setValue] = useState({
        [FIELD_CODE]: null,
        [FIELD_PASSWORD]: null
    })

    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation('common');
    const username = useSelector(state => state.auth?.data?.username);

    const handleClose = () => setShowModal(false);

    const handleChange = (field, e, childName) => {
        const value = e.target.value;

        if(childName){
            setValue(previousState => ({...previousState, [field]: {
                ...previousState[field],
                [childName]: value
            }})) 
        }

        else setValue(previousState => ({...previousState, [field]: value})) 
    }

    const handleSubmit = (field) => {
        if(field === FIELD_CODE){
            const formValues = {
                username: username,
                code: value[FIELD_CODE]
            }

            dispatch(verifyResetPasswordCode(formValues))
            .then(res => {
                const verifiedCode = res.payload.data;
                
                if(verifiedCode){
                    setShowModal(previousState => ({...previousState, [FIELD_CODE]: false, [FIELD_PASSWORD]: true}))
                }
                else {
                    alert('Mã xác nhận không đúng')
                }
            })
        }

        if(field === FIELD_PASSWORD){
            const password = value[FIELD_PASSWORD]['password'].replace(/\s+/g,'');
            const repassword = value[FIELD_PASSWORD]['password'].replace(/\s+/g,'');
            const code = value[FIELD_CODE].replace(/\s+/g,'');

            if(password === repassword){
                const formValues = {
                    username: username,
                    password: password,
                    code: code
                }

                dispatch(updatePassword(formValues))
                .then(res => {
                    alert(res.payload.message);
                    if(res.payload.data){
                        setShowModal(false)
                        history.push('/dang-nhap')
                    }
                })
            }
            else alert('Mật khẩu không khớp');

        }
    }

    const modalConfig = {
        code: {
            name: 'code',
            body: (
                <div className='form-group'>
                    <label htmlFor={FIELD_CODE} className='form-label'>
                        { t('forgetPassword.modal.code.title') }
                    </label>
                    <input 
                        name={FIELD_CODE}
                        type="text"
                        onChange={(e) => handleChange(FIELD_CODE, e)}
                        className="form-control"
                    />
                </div>
            )
        },
        password: {
            name: 'password',
            body: (
                <>
                    <div className='form-group'>
                        <label htmlFor='password' className='form-label'>
                            { t('forgetPassword.modal.password.password') }
                        </label>
                        <input 
                            name="password"
                            type="password"
                            onChange={(e) => handleChange(FIELD_PASSWORD, e, "password")}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='repassword' className='form-label'>
                            { t('forgetPassword.modal.password.confirmPassword') }
                        </label>
                        <input 
                            name="repassword"
                            type="password"
                            onChange={(e) => handleChange(FIELD_PASSWORD, e, "repassword")}
                            className='form-control'
                        />
                    </div>
                </>
            )
        }
    }

    const renderModal = (modal) => {
        if(showModal[modal.name]){
            return (
                <Modal show={showModal[modal.name]} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            { t('forgetPassword.form.title') }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { modal.body }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            { t('forgetPassword.modal.btnCancel') }
                        </Button>
                        <Button variant="success" onClick={(e) => handleSubmit(modal.name)}>
                            { t('forgetPassword.modal.btnOk') }
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        return null;
    }

    const renderComponent = () => {
        if(showModal){
            return (
                <>
                    { renderModal(modalConfig[FIELD_CODE]) }
                    { renderModal(modalConfig[FIELD_PASSWORD]) }
                </>
            )
        }
    }

    return (
        <>
            { renderComponent() }
        </>
    );
  }
  
export default CustomModal