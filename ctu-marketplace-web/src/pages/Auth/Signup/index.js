import React, { useState } from 'react';

import ArrowBack from '../../../components/ArrowBack';

import Tab from '../../../components/Tabs';
import { tabs } from './tabs.data'

const Signup = () => {

    // eslint-disable-next-line no-unused-vars
    const [openTab, setOpenTab] = useState('/users/add/normal_user');

    const onOpenedTabChange = (opendTab) => {
        setOpenTab(opendTab);
    };

    return (
        <div className='container mt-4 mb-4'>
            <div>
                <ArrowBack />
                <Tab 
                    tabs={tabs} 
                    defaultSelectedKey={tabs[0].key}
                    color="red" 
                    openTabChange={onOpenedTabChange} 
                    name="signup"
                />
            </div>
        </div>
    )
}

export default Signup;