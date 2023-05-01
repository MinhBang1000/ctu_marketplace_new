/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveFunctions,
    createFunction,
    updateFunction,
    deleteFunction,

 } from '../../../store/admin.functionSlice';

 import { retrieveRoles } from '../../../store/admin.roleSlice'

import AdminManageInfo from '../../../components/AdminManageInfo'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const formConfig_Add = {
    type: 'add',
    title: "chức năng",
    name: "functions"
}

const formConfig_Edit = {
    type: 'edit',
    title: "chức năng",
    name: "functions"
}

const AdminManageFunction = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.functions.title,
            metaDescription: SEO_ADMIN.functions.metaDescription
        });

        dispatch(retrieveFunctions());
        dispatch(retrieveRoles());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteFunction(id))
    }

    const onEdit = (value) => {
        value = {...value, roleId: Number(value.roleId)}
        const omitValue = _.omit(value, ['role']);
        return dispatch(updateFunction(omitValue))
    }

    const onAdd = (value) => {
        return dispatch(createFunction(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            data={props.roles ? props.roles : []}
            formConfig_Add={formConfig_Add}
            defaultCompobox={{
                roleId: props.roles ? props.roles[0]?.id : null
            }}
            formConfig_Edit={formConfig_Edit}
            formData={props.functions ? props.functions : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            name={'functions'}
            title={ t('admin.functions.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        functions: Object.values(state.functionsAdmin.data),
        roles: Object.values(state.rolesAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    { }
)(AdminManageFunction);
