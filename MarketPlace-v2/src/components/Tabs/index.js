import React from 'react';

import { Tabs, Tab } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const TabsCustom = (props) => {

    const { tabs, defaultSelectedKey, name } = props;

    const [key, setKey] = React.useState(defaultSelectedKey ? defaultSelectedKey : 'home');

    const { t } = useTranslation('common');

    const renderTabs = () => {
        return tabs.map((item, index) => {
            return (
                <Tab 
                    eventKey={item.key} 
                    title={ t(`admin.tabs.${name}.${item.key}`) } 
                    key={index}
                >
                    {item.content}
                </Tab>
            )
        })
    }

    return (
        <>
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                { renderTabs() }
            </Tabs>
        </>
    )
}
export default TabsCustom;