import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { retrieveFooter } from '../../../store/admin.footerSlice';

import AdminManageInfo from '../../../components/AdminManageInfo';

import { header } from './headers.data';
import { columns } from './table-definition';

import { useTranslation } from 'react-i18next';
import { SEO_ADMIN } from '../../../libs/constants-seo';
import { seo } from '../../../libs/helper';

const AdminFooter = () => {
    
    const [footer, setFooter] = useState(null);

    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_ADMIN.footers.title,
            metaDescription: SEO_ADMIN.footers.metaDescription
        });

        dispatch(retrieveFooter(101))
        .then(res => {
            setFooter(res.payload ? [{...res.payload}] : null)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formData={footer}
            useLink={true}
            links={
                {
                    editLink: '/admin/footers/edit',
                }
            }
            name={'footers'}
            title={ t('admin.footer.title') }
            disableDelete={true}
        />
    )
}

export default AdminFooter