/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data'
import { columns } from './table-definition';

import { retrieveFaqs, createFaq, updateFaq, deleteFaq } from '../../../store/admin.faqSlice';

import AdminManageInfo from '../../../components/AdminManageInfo'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const formConfig_Add = {
    type: 'add',
    title: "câu hỏi thường gặp",
    name: "faqs"
}

const formConfig_Edit = {
    type: 'edit',
    title: "câu hỏi thường gặp",
    name: "faqs"
}

const AdminManageFAQS = (props) => {

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.FAQs.title,
            metaDescription: SEO_ADMIN.FAQs.metaDescription
        });

        dispatch(retrieveFaqs());
    }, [])
    
    const onDelete = (id) => {
        return dispatch(deleteFaq(id))
    }

    const onEdit = (value) => {
        return dispatch(updateFaq(value))
    }

    const onAdd = (value) => {
        return dispatch(createFaq(value))
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={props.faqs ? props.faqs : []}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            name={'faqs'}
            title={ t('admin.faqs.title') }
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        faqs: Object.values(state.faqsAdmin.data),
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminManageFAQS);
