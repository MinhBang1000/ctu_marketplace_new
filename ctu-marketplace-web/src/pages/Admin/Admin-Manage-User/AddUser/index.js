import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../components/Tabs";
import { tabs } from "./tabs.data";
import { useTranslation } from "react-i18next";

const AdminManageUser = () => {
  // eslint-disable-next-line no-unused-vars
  const [openTab, setOpenTab] = useState(0);

  const history = useHistory();

  const { t } = useTranslation('common');

  const onOpenedTabChange = (opendTab) => {
    setOpenTab(opendTab);
  };

  return (
    <>
      <button
          className='btn'
          onClick={() => history.goBack()}
      >
          <ArrowBackIcon />
      </button>

      <h4 className="text-center">{ t('admin.users.form.new.title') }</h4>
      <Tab 
        tabs={tabs}
        defaultSelectedKey={tabs[0].key} 
        color="red" 
        openTabChange={onOpenedTabChange} 
        name="users"
      />
    </>
  );
};

export default AdminManageUser;
