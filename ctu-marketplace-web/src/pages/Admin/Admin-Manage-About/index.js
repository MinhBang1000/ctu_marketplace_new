import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { retrieveAbout } from '../../../store/admin.aboutSlice';

import AdminManageInfo from '../../../components/AdminManageInfo';

import { header } from './headers.data';
import { columns } from './table-definition';

import { useTranslation } from 'react-i18next';
import { SEO_ADMIN } from '../../../libs/constants-seo';
import { seo } from '../../../libs/helper';

const AdminFooter = () => {
    
    const [about, setAbout] = useState(null);

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.abouts.title,
            metaDescription: SEO_ADMIN.abouts.metaDescription
        });

        dispatch(retrieveAbout(101))
        .then(res => {
            setAbout(res.payload ? [{...res.payload}] : null)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formData={about}
            useLink={true}
            links={
                {
                    editLink: '/admin/abouts/edit',
                }
            }
            name={'abouts'}
            title={ t('admin.about.title') }
            disableDelete={true}
        />
    )
}

export default AdminFooter