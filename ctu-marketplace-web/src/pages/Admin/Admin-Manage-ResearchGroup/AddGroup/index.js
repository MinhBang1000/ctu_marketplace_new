import React from 'react';

import ArrowBackIcon from '../../../../components/ArrowBack';

import FormUser from './Form'
import { columns as columnsNormalUser } from './table-definition'


const AdminAddResearchGroup = () => {
    
    return (
        <>
            <ArrowBackIcon />
            <div className="mb-4 text-2xl font-bold text-center uppercase">
                Thêm nhóm nghiên cứu
            </div>
            <FormUser columns={columnsNormalUser} />
        </>
    )
}

export default AdminAddResearchGroup;