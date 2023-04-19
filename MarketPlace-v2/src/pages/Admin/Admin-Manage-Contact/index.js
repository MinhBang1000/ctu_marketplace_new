import React, { useEffect, useState } from 'react';

import Tab from '../../../components/Tabs';
import { tabs } from './tabs.data'

import { seo } from '../../../libs/helper'
import { SEO_ADMIN } from '../../../libs/constants-seo'

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

const ResearcherProjects = () => {

    // eslint-disable-next-line no-unused-vars
    const [openTab, setOpenTab] = useState(0);

    useEffect(() => {
        seo({
            title: SEO_ADMIN.contacts.title,
            metaDescription: SEO_ADMIN.contacts.metaDescription
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onOpenedTabChange = (opendTab) => {
        setOpenTab(opendTab);
    };

    return (
        <>
            <Tab 
                tabs={user.data.id === 1 ? tabs : tabs.slice(1, 2)} 
                defaultSelectedKey={user.data.id === 1 ? tabs[0].key : tabs[1].key}
                color="red" 
                openTabChange={onOpenedTabChange} 
                name="contacts"
            />
        </>
    )
}

export default ResearcherProjects;