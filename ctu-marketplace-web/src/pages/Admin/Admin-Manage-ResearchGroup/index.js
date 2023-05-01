/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { 
    retrieveResearchGroupsByUserId,
    createResearchGroup,
    updateResearchGroup,
    deleteResearchGroup,

 } from '../../../store/admin.researchGroupSlice';

import AdminManageInfo from '../../../components/AdminManageInfo'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    title: "Thêm nhóm nghiên cứu",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

const AdminManageResearchGroup = (props) => {

    const dispatch = useDispatch();
    
    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.researchGroups.title,
            metaDescription: SEO_ADMIN.researchGroups.metaDescription
        });

        dispatch(retrieveResearchGroupsByUserId(user.data.id));
    }, [])
    
    const onDelete = (id) => {
        dispatch(deleteResearchGroup(id))
    }

    const onEdit = (value) => {
        return dispatch(updateResearchGroup(value))
    }

    const onAdd = (value) => {
        return dispatch(createResearchGroup(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formData={props.researchGroups ? props.researchGroups : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            useLink={true}
            formConfig_Add={formConfig_Add}
            links={
                {
                    addLink: '/admin/research-groups/new',
                    editLink: '/admin/research-groups/edit',
                }
            }
            otherLinks={
                {
                    addMemberLink: '/admin/research-groups/add-member',
                }
            }
            name={'researcherGroups'}
            title={ t('admin.research-groups.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        researchGroups: Object.values(state.researchGroupsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminManageResearchGroup);
