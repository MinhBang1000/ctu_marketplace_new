/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { header } from './headers.data'
import { columns } from './table-definition';

import AdminManageInfo from '../../../components/AdminManageInfo'
import { ROUTE_NNC_CREATE_PROJECT, ROUTE_NNC_EDIT_PROJECT } from '../../../components/Router/constants'

const AdminField = (props) => {

    let { projects, disableDelete } = props;

    const onDelete = (id) => {
        props.onDelete(id)
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            formData={projects}
            onDelete={onDelete}
            useLink={true}
            links={
                {
                    addLink: ROUTE_NNC_CREATE_PROJECT,
                    editLink: ROUTE_NNC_EDIT_PROJECT,
                    projectType: (projects && projects.length > 0) ? projects[0].projectType : 'commercial',
                }
            }
            disableDelete={disableDelete}
        />
    )
}

export default AdminField
