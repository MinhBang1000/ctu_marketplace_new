import './index.css';

import React, { useEffect, useState } from 'react';
import { useDialog } from 'react-st-modal';

const TYPE_TEXT = 'text'
const TYPE_EMAIL = 'email'
const TYPE_TEXTAREA = 'textarea'
const TYPE_EDITOR = 'editor'

const FormEditField = ({ formConfig, initialValue, fields, data, onSubmit }) => {

    const [value, setValue] = useState(initialValue ? initialValue : {});
    const dialog = useDialog();

    const handleChange = (field, changedValue) => {
        setValue(previousState => ({...previousState, [field]: changedValue }))
    }   

    useEffect(() => {
        const test = document.getElementsByClassName('stf__dialogClose Modal-module_modalCloseIcon__20QFz')
        test[0].classList.add('custom_st_modal_close_button')
    }, [])

    const renderFields = () => {
        if(fields){
            return (
                fields
                    .filter(field => field.editable && (field.type === TYPE_TEXT || field.type === TYPE_EMAIL))            
                    .map((field,index) => {
                        return (
                            <div className='form-group' key={index}>
                                <label>{ field ? field.headerName : '' }</label>
                                <input 
                                    id={field.field}
                                    type={field.type}
                                    required={field.required}
                                    className='form-control' 
                                    disabled={field.isDisabled}
                                    defaultValue={initialValue ? (field.isObject ? initialValue[field.field][field.getBy] : initialValue[field.field]) : ''}
                                    onChange={(e) => handleChange(field.field, e.target.value)} 
                                />
                            </div>
                        )
            }))
        }
        return null
    }
    
    const renderTextAreaFields = () => {
        if(fields){
            return (
                fields
                    .filter(field => field.editable && field.type === TYPE_TEXTAREA)            
                    .map((field,index) => {
                        return (
                            <div className='form-group' key={index}>
                                <label>{ field ? field.headerName : '' }</label>
                                <textarea 
                                    className="form-control" 
                                    disabled={field.isDisabled}
                                    required={field.required}
                                    defaultValue={initialValue ? initialValue[field.field] : ''}
                                    onChange={(e) => handleChange(field.field, e.target.value)} 
                                >
                                </textarea>
                            </div>
                        )
            }))
        }
        return null
    }

    
    const renderEditorField = () => {
        if(fields){
            return fields
                    .filter(field => ( field.editable && field.type === TYPE_EDITOR) )            
                    .map((field,index) => {
                        return (
                            <React.Fragment key={index}>
                                <label>{ field.headerName }</label>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: initialValue ? initialValue[field.field] : '' }}
                                />
                            </React.Fragment>
                    )
            })  
        }
        
        return null;
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        onSubmit(value)
        .then(() => {
            dialog.close(value)
        })
    }
    const onCancelForm = (event) => {
        event.preventDefault();
        dialog.close(value)
    }

    const renderActions =() => {
        return (
            <div className="d-flex justify-content-end gap-2 my-2">
                {
                    formConfig
                    ? (
                        <>
                            <button
                                type='submit'
                                className={`btn rounded-3 ${formConfig?.type === 'edit' ? 'btn-warning' : 'btn-success'}`}
                            >
                                { 
                                    formConfig?.btnOk 
                                }
                            </button>
                            <button
                                onClick={e => onCancelForm(e)}
                                className={`btn btn-secondary rounded-3`}
                            >
                                { 
                                    formConfig?.btnCancel  
                                }
                            </button>
                        </>
                    )
                    : null
                }
            </div>
        ) 
    }

    return (
        <form onSubmit={e => onSubmitForm(e)} style={{ margin: '1rem' }}>
            { renderFields() }
            { renderTextAreaFields() }
            { renderEditorField() }
            { renderActions() }
        </form>
    )
}


export default FormEditField;