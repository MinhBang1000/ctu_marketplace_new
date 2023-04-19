import React, { useEffect } from 'react';

import Tabs from '../../../components/Tabs'
import { tabs } from './tabs.data'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'

const AdminManageInformations = () => {
    useEffect(() => {
        seo({
            title: SEO_ADMIN.information.title,
            metaDescription: SEO_ADMIN.information.metaDescription
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Tabs tabs={tabs} name="informations"/>
    )
}

export default AdminManageInformations;