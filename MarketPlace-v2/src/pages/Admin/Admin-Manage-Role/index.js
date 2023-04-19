/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveRoles,
    createRole,
    updateRole,
    deleteRole,

 } from '../../../store/admin.roleSlice';

import AdminManageInfo from '../../../components/AdminManageInfo'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "vai trò",
    name: 'roles'
}

const formConfig_Edit = {
    type: 'edit',
    title: "vai trò",
    name: 'roles'
}

const AdminManageRoles = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.roles.title,
            metaDescription: SEO_ADMIN.roles.metaDescription
        });
        
        dispatch(retrieveRoles());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteRole(id))
    }

    const onEdit = (value) => {
        return dispatch(updateRole(value))
    }

    const onAdd = (value) => {
        return dispatch(createRole(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.roles ? props.roles : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            name={'roles'}
            title={ t('admin.roles.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        roles: Object.values(state.rolesAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminManageRoles);
