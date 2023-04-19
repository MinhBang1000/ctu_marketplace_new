/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from "react-redux";
import { CustomDialog } from 'react-st-modal';

import { header } from './headers.data';
import { columns } from './table-definition';

import PreviewIcon from '@mui/icons-material/Preview';

import FormEdit from '../../../../components/AdminForm';

import {
    createCustomerContact, deleteCustomerContact, retrieveCustomerContactsByUserId, updateCustomerContact
} from '../../../../store/admin.customer.contactSlice';

import AdminManageInfo from '../../../../components/AdminManageInfo';

import { useTranslation } from 'react-i18next';
import {
    STATUS_ADD_SUCCESS,
    STATUS_EDIT_SUCCESS
} from '../../../../status.messsage';

const formConfig_Edit = {
    title: "Chi tiết liên hệ",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

const Admincontact = (props) => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        dispatch(retrieveCustomerContactsByUserId(user.data.id));
    }, [])
    
    const onDelete = (id) => {
        dispatch(deleteCustomerContact(id))
    }

    const onEdit = (value) => {
        dispatch(updateCustomerContact(value))

        alert.success(STATUS_EDIT_SUCCESS)
    }

    const onAdd = (value) => {
        dispatch(createCustomerContact(value))

        alert.success(STATUS_ADD_SUCCESS)
    }

    const renderAdminFormFields = () => {
        if(columns && columns.length > 0){
            return columns.map(column => {
                return {...column, headerName: t(`admin.admin-manage-info-form.header.${column.headerName.toUpperCase()}`)}
            })
        }

        return null
    }

    const onBtnPreviewClick = async (value) => {
        await CustomDialog(
            <FormEdit 
                initialValue={value}
                fields={renderAdminFormFields()} 
                onSubmit={onEdit}
            />, {
            title: t('admin.contacts.project.form.title'),
            showCloseIcon: true,
        });
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Edit={formConfig_Edit}
            formData={props.customerContacts ? props.customerContacts : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            useCustomActions={true}
            customActions={
                [
                    {
                        icon: <PreviewIcon color="info" />,
                        onSubmit: onBtnPreviewClick,
                    },
                ]
            }
            name={'customerContact'}
            title={ t('admin.contacts.project.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        customerContacts: Object.values(state.customerContactsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    { }
)(Admincontact);
