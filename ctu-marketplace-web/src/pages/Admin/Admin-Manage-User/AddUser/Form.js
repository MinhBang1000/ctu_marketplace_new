import axios from 'axios';
import _ from 'lodash';
import environment from '../../../../environments/environment';

import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { Container } from '@mui/material';
import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';

import { retrieveDomains } from '../../../../store/admin.domainSlice';
import { retrieveRoles } from '../../../../store/admin.roleSlice';
import {
    createAdmin, createResearcher
} from '../../../../store/admin.userSlice';

import { TYPE_ADMIN, TYPE_NNC } from '../user.type';

import Checkbox from '../Checkcbox';
import Combobox from '../Combobox';

import { useTranslation } from 'react-i18next';
import logo from '../../../../assets/logo.png';


const TYPE_TEXT = 'text'
const TYPE_EMAIL = 'email'
const TYPE_DATE = 'date'
const TYPE_EDITOR = 'editor'
const TYPE_PASSWORD= 'password'
const TYPE_COMBOBOX = 'combobox'
const TYPE_CHECKBOX = 'checkbox'
const TYPE_IMAGE = 'image'

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

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'


const AddUser = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()
    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    const [value, setValue] = useState({
        domainId: 1,
        roleId: 1,
        isEnabled: false,
        gender: 0
    });
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    useEffect(() => {
        dispatch(retrieveRoles())
        dispatch(retrieveDomains())
        .then((response) => {
            const defaultDomainId = response.payload[0] ? response.payload[0].id : 0;
            setValue(previousState => ({...previousState, domainId: defaultDomainId }))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { columns, userType, name } = props

    const renderTextField = (field) => {
        return (
            <div className="form-group" key={field.field}>
                <label htmlFor={name + field.field}>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</label>
                <input 
                    id={name + field.field}
                    name={name + field.field}
                    type={field.type} 
                    className="form-control" 
                    onChange={(e) => handleChange(field.field, e.target.value)}
                    required={field.required} 
                    minLength={field.minLength}
                />
            </div>
        )
    }

    const handleCKEditorChange = (event) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        
        handleChange(name, data)
    }

    const renderEditorFields = (field) => {
        return (
            <div className='form-group' key={field.field}>
                <label>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</label>
                <CKEditor 
                    id={field.id}
                    name={field.field}
                    activeClass={field.field}
                    // initData={project ? project[field.fieldName] : ''}
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

    const renderPasswordFields = (field) => {
        return (
            <div className="form-group" key={field.field}>
                <label htmlFor={name + field.field}>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</label>
                <input 
                    type={field.type} 
                    className="form-control" 
                    id={name + field.field} 
                    name={name + field.field}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                    required={field.required}
                />
            </div>
        )
    }

    const renderCheckboxFields = (field) => {
        return (
            <div className='form-group' key={field.field}>
                <Checkbox 
                    label={ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) } 
                    fieldName={field.field} 
                    isChecked={false} 
                    onCheckboxChange={onCheckboxEnableChange} 
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
            <div className="form-group" key={field.field}>
                 <section>{ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) }</section>
                 <DropzoneArea
                     acceptedFiles={['image/*']}
                     dropzoneText={"Drag and drop an image here or click"}
                     onChange={onImageChange}
                     initialFiles={
                     [ props.project 
                         ? props.project.productImage 
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
                    selectedIndex={0} 
                    onChecked={onGenderChange} 
                    key={field.field}
                />
            )
        }
        return (
            <Combobox 
                label={ t(`admin.admin-manage-info-form.header.${field.headerName.toUpperCase()}`) } 
                data={props[field.data]} 
                selectedIndex={1} 
                onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
                key={field.field}
            />
        )
    }

    const onDomainChange = (domainId) => {
        handleChange('domainId', domainId)
    }
    const onRoleChange = (roleId) => {
        handleChange('roleId', roleId)
    }
    const onGenderChange = (genderNumber) => {
        handleChange('gender', genderNumber - 1)
    }

    const onCheckboxEnableChange = (fieldName, checked) => {
        handleChange(fieldName, checked)
    }

    const onSubmitForm = (event) => {
        event.preventDefault();

        const ROLE_ADMIN_ID = 102
        const ROLE_NNC_ID = 103
        
        if(userType === TYPE_NNC){
            const updateValue = {...value, roleId: ROLE_NNC_ID}
            const omitValue = _.omit(updateValue, ['roleId', 'genderNumber', 'isEnabled'])
            
            dispatch(createResearcher(omitValue))
            .then(() => {
                history.push('/admin/users')
                alertUseAlert.success('Đã tạo nhà nghiên cứu thành công')
            })
        }
        
        if(userType === TYPE_ADMIN){
            const updateValue = {...value, roleId: ROLE_ADMIN_ID}
            
            dispatch(createAdmin(updateValue))
            .then(() => {
                history.push('/admin/users')
                alertUseAlert.success('Đã tạo quản trị viên thành công')
            })
            
        }
    }

    const onCancelForm = () => {
    }

    const renderFields = () => {
        return columns
            .filter(field => field.editable)            
            .map(field => {
                switch (field.type) {
                    case TYPE_TEXT:
                    case TYPE_DATE:
                    case TYPE_EMAIL:
                        return renderTextField(field);

                    case TYPE_PASSWORD:
                        return renderPasswordFields(field);

                    case TYPE_COMBOBOX:
                        return renderComboboxFields(field);

                    case TYPE_CHECKBOX:
                        return renderCheckboxFields(field);

                    case TYPE_EDITOR:
                        return renderEditorFields(field);

                    case TYPE_IMAGE:   
                        return renderImageFields(field);

                    default:
                        return null;
                }
            })
    }

    return (
        <>
            <Container 
                maxWidth="lg"
                className="p-2"
            >
                <div>
                    <form 
                        className="d-flex flex-column gap-4"
                        onSubmit={e => onSubmitForm(e)}
                        id={name}
                    >
                        { renderFields() }
                        <div className="form-group">
                            <button
                                // onClick={e => onSubmitForm(e)}
                                type='submit'
                                className="btn btn-success rounded-3"
                                style={{ marginRight: '5px', width: '100px' }}
                            >
                                { t('admin.users.form.new.btnOk') }
                            </button>
                            <button
                                onClick={e => onCancelForm(e)}
                                className="btn btn-danger rounded-3"
                                style={{ width: '100px' }}
                            >
                                { t('admin.users.form.new.btnCancel') }
                            </button>
                        </div>
                    </form>
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
  )(AddUser);