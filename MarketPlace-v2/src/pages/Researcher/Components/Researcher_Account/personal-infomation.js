import environment from '../../../../environments/environment';


import "bootstrap/dist/css/bootstrap.min.css";
import { CKEditor } from 'ckeditor4-react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from "react-redux";
import { changePassword, updateProfile } from '../../../../store/researcher.userSlice';
import './index.css';

import { useTranslation } from 'react-i18next';
import Combobox from './Combobox';
import Modal from './Modal';
import Navbar from './Navbar';
import { columns } from './table-definition';

const TYPE_TEXT = 'text'
const TYPE_DATE = 'date'
const TYPE_EDITOR = 'editor'
const TYPE_COMBOBOX = 'combobox'

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'

const genders = [
    {
        id: 0,
        name: 'Nam'
    },
    {
        id: 1,
        name: 'Nữ'
    },
    {
        id: 2,
        name: 'Khác'
    }
]

const ResearcherAccount = (props) => {

    const alertUseAlert = useAlert()
    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    const [isDisable, setDisable] = useState(true)
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState( props.user ? props.user : {} );
    const [enableEditPassword, setEnableEditPassword] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState(null);

    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    const renderTextFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && ( field.type === TYPE_TEXT || field.type === TYPE_DATE ) ) )            
                            .map((field,index) => {
                                return (
                                    // <TextField 
                                    //     id="outlined-basic" 
                                    //     type={field.type}
                                    //     label={field ? field.headerName : ''} 
                                    //     variant="outlined"
                                    //     disabled={isDisable || !field.editable}
                                    //     defaultValue={props.user ? props.user[field.field] : ''}
                                    //     onChange={(e) => handleChange(field.field, e.target.value)}
                                    // />
                                    <div className="form-group" key={index}>
                                        <label htmlFor={t(`researcher.home.form.${field.field}`)}>{t(`researcher.home.form.${field.field}`)}</label>
                                        <input 
                                            type={field.type} 
                                            className="form-control" 
                                            id={field.headerName} 
                                            disabled={isDisable || !field.editable}
                                            defaultValue={props.user ? props.user[field.field] : ''}
                                            onChange={(e) => handleChange(field.field, e.target.value)}
                                        />
                                    </div>
                                )
        })
    
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const renderEditorFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && field.type === TYPE_EDITOR) )            
                            .map((field,index) => {
                               if(!isDisable){
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="mt-4 text-lg">
                                                { t(`researcher.home.form.${field.field}`) }
                                            </div>
                                            <CKEditor 
                                                id={field.field}
                                                name={field.field}
                                                activeClass={field.field}
                                                initData={props.user ? props.user[field.field] : ''}
                                                config={{
                                                    filebrowserUploadUrl: filebrowserUploadUrl,
                                                    removeButtons: removeButtons,
                                                    isReadOnly: true,
                                                    height: 400,
                                                    extraPlugins: [["embed,autoembed,language,justify,colorbutton,font"]],
                                                    embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',    
                                                }}
                                                onChange={handleCKEditorChange}
                                            />
                                        </React.Fragment>
                                    )
                                }
                                return (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: props.user ? props.user[field.field] : '' }} 
                                            key={index}
                                        />
                                )
                            })
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const renderComboboxFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.isShow && field.type === TYPE_COMBOBOX) )            
                            .map((field,index) => {
                               if(field.field === 'gender'){
                                    return (
                                        <Combobox 
                                            label={t(`researcher.home.form.${field.field}`)} 
                                            data={genders ? genders : []} 
                                            disabled={isDisable ? isDisable : false}
                                            selectedIndex={ props.user ? props.user.gender : 0 } 
                                            onChecked={onGenderChange} 
                                            key={index}
                                        />
                                    )
                               }
                               else {
                                    return (
                                        <Combobox 
                                            label={t(`researcher.home.form.${field.field}`)} 
                                            data={props[field.data]} 
                                            disabled={isDisable ? isDisable : false}
                                            selectedIndex={props.user ? (props.user[field.field] ? props.user[field.field].id : 1) : 1} 
                                            onChecked={field.field === 'domain' ? onDomainChange : onRoleChange} 
                                            key={index}
                                        />
                                    )
                               }
        })
    
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const onDomainChange = (domainId) => {
        handleChange('domainId', domainId)
    }
    const onRoleChange = (roleId) => {
        handleChange('roleId', roleId)
    }
    const onGenderChange = (genderNumber) => {
        handleChange('gender', genderNumber)
    }

    const onDisableStatusChange = (event) => {
        event.preventDefault();
        setDisable(!isDisable)
    }

    const onSubmitForm = (event) => {
        event.preventDefault();

        const updateValue = {...value, 
            roleId: value.role ? value.role.id : null,
        }

        let omitObject = _.omit(updateValue, ['domain', 'role', 'userFunctionList'])
        omitObject = {...omitObject, password: !password ? '' : password};

        dispatch(updateProfile(omitObject))
        .then(() => {
            alertUseAlert.success('Cập nhật thành công')
            setDisable(true)
            setEnableEditPassword(false)
        })
    }

    const handleChangePassword = (userId, formValues) => {
        const data = {
            data: formValues,
            id: userId,
        }
        dispatch(changePassword(data))
        .then(res => {
            if(!res.payload.error){
                alertUseAlert.success(t('message.success.update'))
            }
            else alertUseAlert.error(res.payload.error)
        })
    }

    const renderChangePassword = () => {
        if(enableEditPassword){
            return (
                <Modal 
                    showModal={enableEditPassword}
                    setShowModal={setEnableEditPassword}
                    handleSubmit={handleChangePassword}
                />
            )
        }
        return null
    }

    return (
        <>
            <div className="container mt-4 mb-4">   
                <div className="row">
        
                    <div className="col-lg-4 border">
                        <Navbar user={props.user ? props.user : {}}/>
                    </div>

                    <div className="col-lg-8"> 
                        
                        <h2 className="text-center text-uppercase">
                            { t('researcher.home.title') }
                        </h2>

                        <div className="d-grid grid-sm-2 gap-4">
                            { renderTextFields() }
                            { renderComboboxFields() }
                            { renderEditorFields() }
                            { renderChangePassword() }
                            <div className="form-group d-flex gap-2">
                                {
                                    !isDisable
                                    ? (
                                        <button
                                            onClick={e => onSubmitForm(e)}
                                            className="btn btn-outline-success rounded-3"
                                            style={{ marginRight: '5px', width: '100px' }}
                                        >
                                            { t('researcher.home.form.btn-save') }
                                        </button>
                                    )
                                    : null
                                }
                                <button
                                    onClick={e => onDisableStatusChange(e)}
                                    className={`btn rounded-3 ${isDisable ? 'btn-outline-secondary' : 'btn-outline-danger'}`}
                                >
                                    { isDisable ? t('researcher.home.form.btn-edit') : t('researcher.home.form.btn-cancel') }
                                </button>

                                <button
                                    onClick={() => setEnableEditPassword(true)}
                                    className={`btn rounded-3 btn-outline-success`}
                                >
                                    { t('researcher.home.change-pass.btnActive') }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default ResearcherAccount

  