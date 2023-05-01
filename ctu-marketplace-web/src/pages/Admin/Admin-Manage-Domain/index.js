/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import {
    retrieveDomains,
    createDomain,
    updateDomain,
    deleteDomain,

} from '../../../store/admin.domainSlice';

import AdminManageInfo from '../../../components/AdminManageInfo'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "tên miền",
    name: "domains"
}

const formConfig_Edit = {
    type: 'edit',
    title: "tên miền",
    name: "domains"
}

const AdminManageDomains = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.domains.title,
            metaDescription: SEO_ADMIN.domains.metaDescription
        });

        dispatch(retrieveDomains());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteDomain(id))
    }

    const onEdit = (value) => {
        return dispatch(updateDomain(value))
    }

    const onAdd = (value) => {
        return dispatch(createDomain(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.domains ? props.domains : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            name={'domains'}
            title={ t('admin.domains.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        domains: Object.values(state.domainsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminManageDomains);
