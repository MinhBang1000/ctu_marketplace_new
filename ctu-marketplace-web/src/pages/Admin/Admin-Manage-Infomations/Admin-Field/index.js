/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Confirm, CustomDialog } from 'react-st-modal';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { columns } from './table-definition';

import { retrieveFields } from '../../../../store/admin.fieldSlice';

import { useTranslation } from 'react-i18next';
import FormEdit from '../../../../components/AdminForm';
import CheckboxView from './CheckboxTreeView';

const formConfig_Add = {
    title: "Thêm lĩnh vực",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy',
    name: 'field'
}

const formConfig_Edit = {
    title: "Sửa lĩnh vực",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy',
    name: 'field'
}

const AdminField = (props) => {
    const [editRowsModel, setEditRowsModel] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const [stateFieldsChecked, setFieldsChecked] = useState({
        checked: props.project ? (
            props.project.projectFieldList.map(field => {
                return field.field.id
            } )
        ) : [],
        expanded: []
    })

    useEffect(() => {
        dispatch(retrieveFields());
    }, [])

    const { t } = useTranslation('common');
    
    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const onEdit = (value) => {
        props.editField(value)
    }

    const onAdd = (value) => {
        props.createField(value)
        props.fetchFields()
        window.location.reload()
    }

    const onBtnDeleteClick = async (field) => {
        const CONSTFIRM_TITLE = 'Xác nhận' 
        const CONSTFIRM_TEXT = `Bạn muốn xóa ''${field.name}'' ? `
        const CONSTFIRM_OK_BUTTON_TEXT = 'Đồng ý' 
        const CONSTFIRM_OK_CANCEL_TEXT = 'Hủy' 

        const result = await Confirm(
            CONSTFIRM_TEXT, 
            CONSTFIRM_TITLE,
            CONSTFIRM_OK_BUTTON_TEXT,
            CONSTFIRM_OK_CANCEL_TEXT
        );
        
        if (result) {
            props.deleteField(field.id)
            window.location.reload()
        } else {
        // Сonfirmation not confirmed
        }
    }

    const renderAdminFormFields = () => {
        if(columns && columns.length > 0){
            return columns.map(column => {
                return {...column, headerName: t(`admin.admin-manage-info-form.header.${column.headerName}`)}
            })
        }

        return null
    }

    const onBtnEditClick = async (field) => {
        const btnText = {
            btnOk: t('admin.admin-form.edit.btn-ok'),
            btnCancel: t('admin.admin-form.add.btn-cancel')
        }
        const updateFormConfig = { ...formConfig_Edit, btnText: btnText };

        await CustomDialog(
            <FormEdit 
                formConfig={updateFormConfig}
                initialValue={field}
                fields={renderAdminFormFields()}
                categories={props.categories}
                onSubmit={onEdit}
            />, {
            title: t('admin.admin-form.edit.title') + t(`admin.admin-form.${formConfig_Edit.name}`),
            showCloseIcon: true,
        });

    }

    const onBtnAddClick = async (categoryId) => {
        const initialValue = { childOfFieldId: categoryId }
        
        const btnText = {
            btnOk: t('admin.admin-form.add.btn-ok'),
            btnCancel: t('admin.admin-form.add.btn-cancel')
        }
        const updateFormConfig = { ...formConfig_Add, btnText: btnText };


        await CustomDialog(
            <FormEdit 
                formConfig={updateFormConfig}
                initialValue={initialValue}
                fields={columns} 
                categories={props.categories}
                onSubmit={onAdd}
            />, {
            title: t('admin.admin-form.add.title') + t(`admin.admin-form.${formConfig_Add.name}`),
            showCloseIcon: true,
        });

    }


    const renderRows = (rows) => {
        return rows.map(row => {
            const actions = (
                <div className="flex gap-1">
                    <button 
                        onClick={() => onBtnEditClick(row)}
                        className="flex px-2 py-2 text-white bg-gray-500 rounded-lg"    
                    >
                        <EditIcon />
                    </button>
                    <button 
                        onClick={() => onBtnDeleteClick(row)}
                        className="flex px-2 py-2 text-white bg-red-600 rounded-lg"    
                    >
                        <DeleteIcon />
                    </button>
                </div>
            )
            const actionAdd = row.childOfFieldList  
                        ? (
                            <div className="">
                                <button 
                                    className="flex px-4 py-2 text-white bg-green-500 rounded-lg"
                                    onClick={() => onBtnAddClick(row.id)}
                                >
                                    <ControlPointIcon />
                                </button>
                            </div>
                        ): null
            return {...row, actions, actionAdd}
        })
    }

    const renderCheckboxCategoryChildren = (field) => {
        let children = [];
        let fieldIdString = field.id.toString();
        if(field && fieldIdString.length !== 5){
            if(field.childOfFieldList){
                if(field.childOfFieldList.length){
                    field.childOfFieldList
                        .map(fieldChild => {
                            if(renderCheckboxCategoryChildren(fieldChild)){
                                return children.push({
                                    value: `${fieldChild.id}`,
                                    label: (
                                        <>
                                            { fieldChild.name } 
                                            {
                                                fieldChild.id.toString().length !== 5
                                                ? 
                                                    <>
                                                        <button 
                                                            onClick={() => onBtnAddClick(fieldChild.id)}
                                                            className="btn btn-outline-success rounded-3"
                                                            style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}
                                                        >
                                                            <ControlPointIcon color="success" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnEditClick(fieldChild)}
                                                            className="btn btn-outline-warning rounded-3"
                                                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                        >
                                                            <EditIcon color="warning" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnDeleteClick(fieldChild)}
                                                            className="btn btn-outline-danger rounded-3"
                                                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </button>
                                                    </>
                                                
                                                : 
                                                    <>
                                                        <button 
                                                            onClick={() => onBtnEditClick(fieldChild)}
                                                            className="btn btn-outline-warning rounded-3"
                                                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                        >
                                                            <EditIcon color="warning" />
                                                        </button>
                                                        <button 
                                                            onClick={() => onBtnDeleteClick(fieldChild)}
                                                            className="btn btn-outline-danger rounded-3"
                                                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </button>
                                                    </>
                                            }
                                        </>
                                    ),
                                    children: renderCheckboxCategoryChildren(fieldChild)
                                })
                            }
                            return children.push({
                                value: `${fieldChild.id}`,
                                label: (
                                    <>
                                        { fieldChild.name } 
                                        {
                                            fieldChild.id.toString().length !== 5
                                            ? 
                                                <>
                                                    <button 
                                                        onClick={() => onBtnAddClick(fieldChild.id)}
                                                        className="btn btn-outline-success rounded-3"
                                                        style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}
                                                    >
                                                        <ControlPointIcon color="success" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnEditClick(fieldChild)}
                                                        className="btn btn-outline-warning rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                    >
                                                        <EditIcon color="warning" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnDeleteClick(fieldChild)}
                                                        className="btn btn-outline-danger rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </button>
                                                </>
                                            :  
                                                <>
                                                    <button 
                                                        onClick={() => onBtnEditClick(fieldChild)}
                                                        className="btn btn-outline-warning rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                    >
                                                        <EditIcon color="warning" />
                                                    </button>
                                                    <button 
                                                        onClick={() => onBtnDeleteClick(fieldChild)}
                                                        className="btn btn-outline-danger rounded-3"
                                                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </button>
                                                </>
                                        }
                                    </>
                                ),
                            })
                        })
                }
                
                if(children.length){
                    return children
                }
            }
        }
        return null
    }


    const nodes = (props.fields) ? Object.values(props.fields).map(field => {
        if(renderCheckboxCategoryChildren(field)){
            return {
                value: `${field.id}`,
                label: (
                    <>
                        { field.name } 
                        <button 
                            onClick={() => onBtnAddClick(field.id)}
                            className="btn btn-outline-success rounded-3"
                            style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}
                        >
                            <ControlPointIcon color="success" />
                        </button>
                        <button 
                            onClick={() => onBtnEditClick(field)}
                            className="btn btn-outline-warning rounded-3"
                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                        >
                            <EditIcon color="warning" />
                        </button>
                        <button 
                            onClick={() => onBtnDeleteClick(field)}
                            className="btn btn-outline-danger rounded-3"
                            style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                        >
                            <DeleteIcon color="error" />
                        </button>
                    </>
                ),
                children: renderCheckboxCategoryChildren(field)
            }
        }
        return {
            value: `${field ? field.id : ''}`,
            label: (
                <>
                    { field.name } 
                    <button 
                        onClick={() => onBtnAddClick(field.id)}
                        className="btn btn-outline-success rounded-3"
                        style={{ padding: '2px', marginLeft: '20px', marginBottom: '5px' }}
                    >
                        <ControlPointIcon color="success" />
                    </button>
                    <button 
                        onClick={() => onBtnEditClick(field)}
                        className="btn btn-outline-warning rounded-3"
                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                    >
                        <EditIcon color="warning" />
                    </button>
                    <button 
                        onClick={() => onBtnDeleteClick(field)}
                        className="btn btn-outline-danger rounded-3"
                        style={{ padding: '2px', marginLeft: '10px', marginBottom: '5px' }}
                    >
                        <DeleteIcon color="error" />
                    </button>
                </>
            ),
        }
    })
    : console.log('');

    const onCheckboxTreeViewChecked = (checked) => {
        setFieldsChecked(previousState => ({...previousState, checked}))
    }


    const renderCheckboxTreeView = (fields) => {
        return (
            <CheckboxView 
                id={fields.length} 
                nodes={nodes} 
                stateFieldIdList={stateFieldsChecked} 
                setStateFieldIdListChecked={onCheckboxTreeViewChecked} 
                setStateFieldIdListExpanded={expanded => setFieldsChecked(previousState => ({ ...previousState, expanded: expanded }))} 
            />
        )
     }

    return (
        
        <div className="mt-4">
            { 
                props.fields && props.fields.length > 0 
                    ? renderCheckboxTreeView(props.fields) 
                    : null 
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        fields: Object.values(state.fieldsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminField);
