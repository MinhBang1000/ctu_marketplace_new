/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveDevelopmentLevels,
    createDevelopmentLevel,
    updateDevelopmentLevel,
    deleteDevelopmentLevel,

 } from '../../../../store/admin.developmentLevelSlice';

import AdminManageInfo from '../../../../components/AdminManageInfo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "mức độ phát triển",
    name: "development-level"
}

const formConfig_Edit = {
    type: 'edit',
    title: "mức độ phát triển",
    name: "development-level"
}

const AdminField = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        dispatch(retrieveDevelopmentLevels());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteDevelopmentLevel(id))
    }

    const onEdit = (value) => {
        return dispatch(updateDevelopmentLevel(value))
    }

    const onAdd = (value) => {
        return dispatch(createDevelopmentLevel(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.levels ? props.levels : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            title={ t('admin.informations.development-levels.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        levels: Object.values(state.developmentLevelsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    { }
)(AdminField);
