import axios from 'axios';
import environment from '../../../../environments/environment';

import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container } from '@mui/material';

import { CKEditor } from 'ckeditor4-react';
import { DropzoneArea } from 'material-ui-dropzone';

import authHeader from '../../../../services/auth.header';
import { updateResearchGroup } from '../../../../store/admin.researchGroupSlice';

import {
    STATUS_EDIT_SUCCESS
} from '../../../../status.messsage';

import Checkbox from '../Checkcbox';
import Combobox from '../Combobox';

import logo from '../../../../assets/logo.png';

const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
const TYPE_EDITOR = 'editor'
const TYPE_COMBOBOX = 'combobox'
const TYPE_CHECKBOX = 'checkbox'
const TYPE_IMAGE = 'image'

const genders = [
    {
        id: true,
        name: 'Nam'
    },
    {
        id: false,
        name: 'Nữ'
    },
    {
        id: false,
        name: 'Khác'
    }
]

const filebrowserUploadUrl = environment.url.java +  '/upload-file';
const removeButtons = 'PasteFromWord'


const UpdateUser = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()
    const dispatch = useDispatch();

    const [value, setValue] = useState(props.group ? props.group : {});

    // eslint-disable-next-line no-unused-vars
    const [isShowChipMember, setShowChipMember] = useState(false)
    
    const handleChange = (field, updateValue) => {
        setValue(previousState => ({...previousState, [field]: updateValue }))
    }   


    useEffect(() => {
    }, [])

    const { columns } = props

    const renderTextFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_TEXT) )            
                            .map((field,index) => {
                                return (
                                    <div className='form-group' key={index}>
                                        <label className='form-label' htmlFor={field.field}>{field ? field.headerName : ''}</label>
                                        <input 
                                            id={field.field}
                                            placeholder={field ? field.headerName : ''} 
                                            className="form-control"
                                            defaultValue={props.group ? props.group[field.field] : ''}
                                            onChange={(e) => handleChange(field.field, e.target.value)}
                                        />
                                    </div>
                                )
        })
    
        return (
            <div className="flex flex-col gap-4">
                { usersFormat }
            </div>
        )
    }

    const renderTextAreaFields = () => {
        return (
            columns
                .filter(field => field.editable && field.type === TYPE_TEXTAREA)            
                .map((field,index) => {
                    return (
                        <div className='form-group' key={index}>
                            <label className='form-label' htmlFor={field.field}>{field ? field.headerName : ''}</label>
                            <textarea 
                                className='form-control'
                                id={field.field}
                                rows={6}
                                rowsMax={10}
                                defaultValue={props.group ? props.group[field.field] : ''}
                                onChange={(e) => handleChange(field.field, e.target.value)} 
                            />
                        </div>
                    )
        }))
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
                                return (
                                    <div className="flex flex-col gap-4 mt-4" key={index}>
                                        <section>{ field.headerName }</section>
                                        <CKEditor 
                                            id={field.id}
                                            name={field.field}
                                            activeClass={field.field}
                                            initData={props.group ? props.group[field.field] : ''}
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
        })
    
        return (
            <>
                { usersFormat }
            </>
        )
    }

    const renderCheckboxFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_CHECKBOX) )            
                            .map((field,index) => {
                                return (
                                    <Checkbox key={index} label={field.headerName} fieldName={field.field} isChecked={false} onCheckboxChange={onCheckboxEnableChange} />
                                )
        })
    
        return (
            <div className="flex gap-4">
                { usersFormat }
            </div>
        )
    }

    const onImageChange = (files) => {
            let formData = new FormData();
            formData.append("upload", files[0]);

            axios.post(environment.url.java + '/upload-file', formData, { headers: authHeader() } )
                .then(response => {
                    const imgSrc = response.data.url;

                    if (response.data) {
                        handleChange('groupImage', imgSrc)
                    } else {
                        return alert('failed to upload file')
                    }
                })
                .catch(error => {
                })
    }

    const renderImageFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_IMAGE) )            
                            .map((field,index) => {
                                return (
                                   <div className="flex flex-col gap-4 mt-4" key={index}>
                                        <section>{ field.headerName }</section>
                                        <DropzoneArea
                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Drag and drop an image here or click"}
                                            onChange={onImageChange}
                                            initialFiles={
                                            [ props.group 
                                                ? props.group.groupImage 
                                                : logo
                                            ]}
                                        />
                                   </div>
                                )
        })
    
        return (
            <div className="flex flex-col gap-4">
                { usersFormat }
            </div>
        )
    }

    const renderComboboxFields = () => {
        const usersFormat = columns
                            .filter(field => ( field.editable && field.type === TYPE_COMBOBOX) )            
                            .map((field,index) => {
                               if(field.field === 'gender'){
                                   
                                    return (
                                        <Combobox 
                                            label={field.headerName} 
                                            data={genders ? genders : []} 
                                            selectedIndex={true} 
                                            onChecked={onGenderChange} 
                                            key={index}
                                        />
                                    )
                               }
                               return (
                                <Combobox 
                                    label={field.headerName} 
                                    data={props[field.data]} 
                                    selectedIndex={1} 
                                    onChecked={field.field === 'domainId' ? onDomainChange : onRoleChange} 
                                    key={index}
                                />
                            )
        })
    
        return (
            <div className="flex flex-col gap-5">
                { usersFormat }
            </div>
        )
    }

    const onDomainChange = (domainId) => {
        handleChange('domainId', domainId)
    }
    const onRoleChange = (roleId) => {
        handleChange('roleId', roleId)
    }
    const onGenderChange = (gender) => {
        handleChange('gender', gender)
    }

    const onCheckboxEnableChange = (fieldName, checked) => {
        handleChange(fieldName, checked)
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        dispatch(updateResearchGroup(value))
        history.push('/admin/research-groups')
        alertUseAlert.success(STATUS_EDIT_SUCCESS)
    }

    const onCancelForm = () => {
    }

    return (
        <>
            <Container 
                maxWidth="lg"
                className="flex gap-4 p-2"
            >
                <div className="mt-2">
                    { renderTextFields() }
                </div>
                
                <div className="mt-3">
                    { renderTextAreaFields() }
                </div>

                <div className="flex flex-col gap-4">
                    { renderComboboxFields() }
                    { renderCheckboxFields() }
                </div>

                <div>
                    { renderEditorFields() }
                </div>

                <div>
                    { renderImageFields() }
                </div>

                <div className="d-flex justify-content-start gap-2 my-2">
                    <button
                        onClick={e => onSubmitForm(e)}
                        className="btn btn-warning mt-4 mb-4 text-white"
                    >
                        Cập nhật
                    </button>
                    <button
                        onClick={e => onCancelForm(e)}
                        className="btn btn-secondary mt-4 mb-4 text-white"
                    >
                        Hủy
                    </button>
                </div>

            </Container>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        // group: state.researchGroups[ownProps.match.params.id],
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(UpdateUser);