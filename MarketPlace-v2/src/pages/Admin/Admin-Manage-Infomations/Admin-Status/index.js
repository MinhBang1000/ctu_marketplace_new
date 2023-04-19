/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveStatuses,
    createStatus,
    updateStatus,
    deleteStatus,

 } from '../../../../store/statusSlice';

import AdminManageInfo from '../../../../components/AdminManageInfo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "trạng thái",
    "name": "status"
}

const formConfig_Edit = {
    type: 'edit',
    title: "trạng thái",
    "name": "status"
}

const AdminField = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        dispatch(retrieveStatuses());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteStatus(id))
    }

    const onEdit = (value) => {
        return dispatch(updateStatus(value))
    }

    const onAdd = (value) => {
        return dispatch(createStatus(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.status ? props.status : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            title={ t('admin.informations.status.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        status:  Object.values(state.status.data),
    };
}

export default connect(
    mapStateToProps, 
    { }
)(AdminField);
