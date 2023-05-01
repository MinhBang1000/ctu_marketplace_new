import axios from 'axios';
import _ from 'lodash';
import { ROLE_ADMIN, ROLE_NNC, ROLE_SUPER_ADMIN, ROLE_USER } from '../../../../../environments/constraints';
import environment from '../../../../../environments/environment';

import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container } from '@mui/material';
import ArrowBack from '../../../../../components/ArrowBack';

import { retrieveDomains } from '../../../../../store/admin.domainSlice';
import { retrieveRoles } from '../../../../../store/admin.roleSlice';
import { updateAdmin, updateAdminFunctionStatus, updateResearcher } from '../../../../../store/admin.userSlice';

import { columns as normalUserColumn } from '../../AddUser/table-definition-normalUser';
import { columns as researcherColumn } from '../../AddUser/table-definition-researcherUser';
import { columns as adminColumn } from '../../EditUser/table-definition-admin';

import Checkbox from '../../Checkcbox';
import Combobox from '../../Combobox';

import { useTranslation } from 'react-i18next';
import logo from '../../../../../assets/logo.png';

const TYPE_TEXT = 'text'
const TYPE_DATE = 'date'
const TYPE_EMAIL = 'email'
const TYPE_PASSWORD = 'password'
const TYPE_COMBOBOX = 'combobox'
const TYPE_EDITOR = 'editor'
const TYPE_IMAGE = 'image'

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'

const genders = [
    {
        id: 1,
        name: 'Nam'
    },
    {
        id: 2,
        name: 'Nữ'
    },
    {
        id: 3,
        name: 'Khác'
    }
]

const DEFAULT_DOMAIN_ID = 101

const EditUser = (props) => {
    const alertUseAlert = useAlert()
    const history = useHistory();
    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    const [value, setValue] = useState(props.user 
        ?  {
            ...props.user, 
            domainId: props.user ? (props.user.domain? props.user.domain.id : DEFAULT_DOMAIN_ID) : DEFAULT_DOMAIN_ID,
            password: props.user ? props.user.password : 1,
        } 
        : {}
    );

    const [password, setPassword] = useState(null);
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   


    useEffect(() => {
        dispatch(retrieveRoles())
        dispatch(retrieveDomains())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderTextFields = (field) => {
        return (
            <div className="form-group" key={field.headerName}>
                <label htmlFor={field.headerName}>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</label>
                <input 
                    type={field.type} 
                    className="form-control" 
                    id={field.headerName}
                    defaultValue={props.user ? props.user[field.field] : ''}
                    onChange={(e) => handleChange(field.field, e.target.value)} 
                    required={field.required} 
                    minLength={field.minLength}
                />
            </div>
        )
    }

    const renderPasswordFields = (field) => {
        return (
            <div className="form-group" key={field.headerName}>
                <label htmlFor={field.headerName}>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</label>
                <input 
                    type={field.type} 
                    className="form-control" 
                    id={field.headerName} 
                    value={password ?? ''}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={field.minLength}
                />
            </div>
        )
    }

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const renderEditorFields = (field) => {
        return (
            <div className="d-flex flex-column gap-4" key={field.headerName}>
                <section>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</section>
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
            </div>
        )
    }

    const onImageChange = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("upload", files[0]);

        axios.post(environment.url.java + '/upload-file', formData, config)
            .then(response => {
                const imgSrc = response.data.url;

                if (response.data) {
                    handleChange('avatar', imgSrc)
                } else {
                    return alert('failed to upload file')
                }
            })
}

    const renderImageFields = (field) => {
        return (
            <div className="form-group" key={field.headerName}>
                <section>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</section>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={onImageChange}
                    initialFiles={
                    [ props.user 
                        ? props.user.avatar 
                        : logo
                    ]}
                />
           </div>
        )
    }

    const renderComboboxFields = (field) => {
        if(field.field === 'gender'){
            return (
                <Combobox 
                    label={ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) } 
                    data={genders ? genders : []} 
                    selectedIndex={props.user ? props.user.gender : 0} 
                    onChecked={onGenderChange} 
                    key={field.headerName}
                />
            )
        }
        return (
            <Combobox 
                label={ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) } 
                data={props[field.data]} 
                selectedIndex={props.user ? (props.user[field.parent] ? props.user[field.parent].id : 1) : 1} 
                onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
                key={field.headerName}
            />
        )
    }

    const onDomainChange = (domainId) => {
        console.log('onDomainCHange', domainId)
        handleChange('domainId', domainId)
    }
    const onRoleChange = (roleId) => {
        handleChange('roleId', roleId)
    }
    const onGenderChange = (genderNumber) => {
        handleChange('gender', genderNumber - 1 )
    }

    const onCheckboxUserFunctionChange = (userId, functionId, checked, functionDescription)  => {

        const data = {
            userProfileId: userId,
            functionId: functionId,
            isEnabled: checked,
        }
        dispatch(updateAdminFunctionStatus(data))

        const status = checked ? 'bật' : 'tắt';
        const message = 'Đã ' + status + ' chức năng ' +  functionDescription
        
        if(checked){
            alertUseAlert.success(message);
        }
        else {
            alertUseAlert.error(message)
        }
    }

    const onSubmit_NormalUser = (event) => {
        event.preventDefault();
        
        const updateValue = {...value, 
            domainId: value.domain ? value.domain.id : null,
        }
        const omitObject = _.omit(updateValue, ['domain', 'role', 'userFunctionList'])

        props.editNormalUser_Admin(omitObject)
            .then(() => {
                alertUseAlert.success('Đã cập nhật thông tin người dùng')
                history.push('/admin/users')
            })

    }
    const onSubmit_ResearcherUser = (event) => {

        event.preventDefault();

        let pickedObject = _.pick(value,
            ['id', 'fullName', 'email', 'dob', 'phoneNumber', 'address', 'gender', 'username', 'password', 'qualification', 'website', 'bio', 'domainId', 'avatar']
        )
        pickedObject = {...pickedObject, password: !password ? '' : password};

        dispatch(updateResearcher(pickedObject))
            .then(() => {
                alertUseAlert.success('Đã cập nhật thông tin nhà nghiên cứu')
                history.push('/admin/users')
            })
        
        
    }
    const onSubmit_AdminUser = (event) => {

        event.preventDefault();
        
        let pickedObject = _.pick(value,
            ['id', 'fullName', 'email', 'phoneNumber', 'address', 'gender', 'username', 'password', 'domainId']
        )

        pickedObject = {...pickedObject, password: !password ? '' : password};

        dispatch(updateAdmin(pickedObject))
            .then(() => {
                alertUseAlert.success('Đã cập nhật quản trị viên')
                history.push('/admin/users')
            })

    }

    const onSubmitForm = (event) => {
        if(props.user.role.code === ROLE_NNC){
            onSubmit_ResearcherUser(event)
        }
        if(props.user.role.code === ROLE_ADMIN || props.user.role.code === ROLE_SUPER_ADMIN){
            onSubmit_AdminUser(event)
        }
        else {
            onSubmit_NormalUser(event)
        }
    }

    const onCancelForm = () => {
    }

    const renderCheckboxUserFunctions = () => {
        const userFunctionList 
            = props.user 
            ? (
                props.user.userFunctionList
                ? props.user.userFunctionList
                    .map((userFunction,index) => {
                        return (
                            <Checkbox 
                                label={userFunction.function.name} 
                                isChecked={userFunction.isEnabled} 
                                onCheckboxChange={(fieldName, checked) => onCheckboxUserFunctionChange(props.user.id, userFunction.function.id, checked, userFunction.function.name)}
                                key={index}
                            />
                        )
                    })
                : null
            )
            : null 
    
        return (
            <div className="d-flex flex-column gap-4">
                { userFunctionList }
            </div>
        )
    }

    const renderFields = () => {
        return (props.user 
                ? (
                    props.user.role
                    ? (
                        props.user.role.code === ROLE_USER ? normalUserColumn : 
                        props.user.role.code === ROLE_NNC ? researcherColumn : 
                        ( props.user.role.code === ROLE_ADMIN || props.user.role.code === ROLE_SUPER_ADMIN ) ? adminColumn : []
                    ) 
                    : []
                )
                : [] )
            .filter(field => field.editable)            
            .map(field => {
                switch (field.type) {
                    case TYPE_TEXT:
                    case TYPE_DATE:
                    case TYPE_EMAIL:
                        return renderTextFields(field);
                    
                    case TYPE_PASSWORD:
                        return renderPasswordFields(field);

                    case TYPE_EDITOR:
                        return renderEditorFields(field);

                    case TYPE_IMAGE:
                        return renderImageFields(field);

                    case TYPE_COMBOBOX:
                        return renderComboboxFields(field);    

                    default:
                        return null;
                }
            })
    }

    return (

        <>
            <ArrowBack />
            <Container 
                maxWidth="lg"
                className="gap-4 p-2"
            >   
                <h4 className="text-center">{ t('admin.users.form.edit.title') }</h4>

                <div className="row">
                    <div className={`${props?.user?.role?.code !== ROLE_USER ? 'col-sm-6' : ''}`}> 
                        
                        <form onSubmit={e => onSubmitForm(e)} className="d-flex flex-column gap-4">
                            { renderFields() }
                            <div className="form-group">
                                <button
                                    type='submit'
                                    className="btn btn-warning rounded-3"
                                    style={{ marginRight: '5px', width: '120px' }}
                                >
                                    { t('admin.users.form.edit.btnOk') }
                                </button>
                                <button
                                    onClick={e => onCancelForm(e)}
                                    className="btn btn-danger rounded-3"
                                    style={{ width: '120px' }}
                                >
                                    { t('admin.users.form.edit.btnCancel') }
                                </button>
                            </div>

                        </form>
                    </div>

                    {
                        props?.user?.role?.code !== ROLE_USER
                        ? (
                            <div className="col-sm-3">
                                <div className="mb-4 text-2xl font-medium">
                                    Quyền truy cập 
                                </div>
                                <div className="mt-2">
                                    { renderCheckboxUserFunctions() }
                                </div>
                            </div>
                        )
                        : null
                    }
                    
                </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        roles: Object.values(state.rolesAdmin.data),
        domains: Object.values(state.domainsAdmin.data),
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(EditUser);

  