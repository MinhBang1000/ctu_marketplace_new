/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";

import { header } from './headers.data';
import { columns } from './table-definition';

import { retrieveRoles } from '../../../store/admin.roleSlice';
import { deleteUserByUsername, enableUser, retrieveUsersByUserId } from '../../../store/admin.userSlice';

import Checkbox from './Checkcbox';

import AdminManageInfo from '../../../components/AdminManageInfo';

import _ from 'lodash';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { SEO_ADMIN } from '../../../libs/constants-seo';
import { seo } from '../../../libs/helper';

const formConfig_Add = {
    title: "Thêm người dùng",
    button_text_ok: 'Thêm',
    button_text_cancel: 'Hủy'
}

const formConfig_Edit = {
    title: "Sửa người dùng",
    button_text_ok: 'Sửa',
    button_text_cancel: 'Hủy'
}

const ROLE_USER_ID = 104;

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

const AdminField = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { t } = useTranslation('common');

    const [users, setUsers] = useState(props.users ?? []);

    useEffect(() => {
        seo({
            title: SEO_ADMIN.users.title,
            metaDescription: SEO_ADMIN.users.metaDescription
        });

        dispatch(retrieveUsersByUserId(user.data.id))
        .then(res => {
            setUsers(res.payload);
        });
        dispatch(retrieveRoles());
    }, [])
    
    const onCheckboxEnableChange = (userId, isEnabled) => {
        dispatch(enableUser({
            userId: userId, 
            isEnabled: isEnabled
        }))
    }

    const renderRows = (rows) => {
        if(rows && rows.length > 0) {
            return Object.values(rows).map((row,index) => {
                const enabled = (
                    <div className="d-flex gap-2" key={index}>
                        <Checkbox 
                            fieldName="isEnabled"
                            isChecked={ row.isEnabled } 
                            onCheckboxChange={(fieldName, isEnabled) => onCheckboxEnableChange(row.id, isEnabled)} 
                        />
                    </div>
                )

                return {
                    ...row, 
                    enabled: enabled,
                }
            })
        }
        return null
    }

    const renderConditionDisableEditForEachItem = () => {
        let filteredItems = [];
        if(props.users && props.users.length > 0){
                filteredItems = props.users.map(user => {
                    return {
                        id: user.id,
                        isDisableEdit: user?.role?.id === ROLE_USER_ID
                    }
                }
            )
        }

        const result = _.mapKeys(filteredItems, 'id')

        return result
    }

    const onDelete = (username) => {
       dispatch(deleteUserByUsername(username))
       .then(res => {
            if(res.payload.isSuccess) {
                alert.success(t('message.success.delete'));
                const users = props.users.filter(user => user.username !== username);
                setUsers(users);
            }
            else alert.error(t('message.fail.delete'));
       });
    }

    return (
        <AdminManageInfo 
            header={header}
            columns={columns}
            data={props.roles ? props.roles : []}
            formConfig_Add={formConfig_Add}
            formConfig_Edit={formConfig_Edit}
            formData={renderRows(users)}
            useLink={true}
            links={
                {
                    addLink: '/admin/users/new',
                    editLink: '/admin/users/edit',
                }
            }
            useCustomOnDelete={true}
            onDelete={onDelete}
            deleteBy="username"
            name={'users'}
            title={ t('admin.users.title') }
            useSubHeader={{
                enabled: true,
                filterBy: "username"
            }}
            disableEdit={renderConditionDisableEditForEachItem()}
        />
    )
}

const mapStateToProps = (state) => {
    return { 
        users: state.usersAdmin.data ? Object.values(state.usersAdmin.data) : [],
        roles: state.rolesAdmin.data ? Object.values(state.rolesAdmin.data) : [],
    };
}

export default connect(
    mapStateToProps, 
    { }
)(AdminField);
