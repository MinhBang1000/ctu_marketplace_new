import React,{ useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { retrieveHomeVideoById } from '../../../store/admin.homeVideoSlice';

import AdminManageInfo from '../../../components/AdminManageInfo'

import { header } from './headers.data'
import { columns } from './table-definition';

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const AdminManageHomeVideo = () => {
    
    const [homeVideo, setHomeVideo] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.footers.title,
            metaDescription: SEO_ADMIN.footers.metaDescription
        });

        dispatch(retrieveHomeVideoById(101))
        .then(res => {
            const data = res.payload.data;
            setHomeVideo([{...data}])
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formData={homeVideo}
            useLink={true}
            links={
                {
                    editLink: '/admin/home-video/edit',
                }
            }
            name={'footers'}
            title={ t('admin.home-video.title') }
            disableDelete={true}
        />
    )
}

export default AdminManageHomeVideo