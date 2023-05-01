/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveTransmisstionMethods,
    createTransmisstionMethod,
    updateTransmisstionMethod,
    deleteTransmisstionMethod,

 } from '../../../../store/admin.transmisstionMethodSlice';

import AdminManageInfo from '../../../../components/AdminManageInfo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "phương thức chuyển giao",
    name: "transmisstion-method"
}

const formConfig_Edit = {
    type: 'edit',
    title: "phương thức chuyển giao",
    name: "transmisstion-method"
}

const AdminTransmisstionMethod = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        dispatch(retrieveTransmisstionMethods());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteTransmisstionMethod(id))
    }

    const onEdit = (value) => {
        return dispatch(updateTransmisstionMethod(value))
    }

    const onAdd = (value) => {
        return dispatch(createTransmisstionMethod(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.transmisstionMethods ? props.transmisstionMethods : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            title={ t('admin.informations.transmisstion-methods.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        transmisstionMethods:  Object.values(state.transmisstionMethodsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    { }
)(AdminTransmisstionMethod);
