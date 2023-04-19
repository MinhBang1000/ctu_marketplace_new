/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert'
import { connect, useDispatch } from "react-redux";
import { CustomDialog } from 'react-st-modal';
import FormEdit from '../../../../components/AdminForm'

import { header } from './headers.data'
import { columns } from './table-definition';

import PreviewIcon from '@mui/icons-material/Preview';

import { 
    retrieveGeneralContacts,
    createGeneralContact,
    updateGeneralContact,
    deleteGeneralContact,

 } from '../../../../store/admin.general.contactSlice';

import AdminManageInfo from '../../../../components/AdminManageInfo'

import {
    STATUS_ADD_SUCCESS,
    STATUS_EDIT_SUCCESS,

} from '../../../../status.messsage'
import { useTranslation } from 'react-i18next';

const formConfig_Edit = {
    title: "Chi tiết liên hệ",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

const AdminGeneralContact = (props) => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        if(user.data.id === 1){
            dispatch(retrieveGeneralContacts());
        }
    }, [])
    
    const onDelete = (id) => {
        dispatch(deleteGeneralContact(id))
    }

    const onEdit = (value) => {
        dispatch(updateGeneralContact(value))

        alert.success(STATUS_EDIT_SUCCESS)
    }

    const onAdd = (value) => {
        dispatch(createGeneralContact(value))

        alert.success(STATUS_ADD_SUCCESS)
    }

    const onBtnPreviewClick = async (value) => {
        await CustomDialog(
            <FormEdit 
                initialValue={value}
                fields={columns} 
                onSubmit={onEdit}
            />, {
            title: t('admin.contacts.general.form.title'),
            showCloseIcon: true,
        });
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Edit={formConfig_Edit}
            formData={props.generalContacts ? props.generalContacts : []}
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
            name={'generalContact'}
            title={ t('admin.contacts.general.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        generalContacts: Object.values(state.generalContactsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminGeneralContact);
