import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from 'react-redux';

import ArrowBack from '../../../../../components/ArrowBack';

import AdminManageInfo from '../../../../../components/AdminManageInfo';
import { header } from './headers.data';
import { columns } from './table-definition';

import { retrieveDomains } from '../../../../../store/admin.domainSlice';
import { addMemberToGroup, addOtherMemberToGroup, deleteMemberFromGroup, retrieveResearchGroupById } from '../../../../../store/admin.researchGroupSlice';
import { retrieveRoleOfGroups } from '../../../../../store/admin.roleOfGroupSlice';
import { retrieveResearcherUsers } from '../../../../../store/admin.userSlice';

import Combobox from '../../Combobox';
import FormOutsideMember from '../../Components/FormOutsideMember';

const MESSAGE_ADD_SUCCCESS = "Thêm thành viên thành công"

const SUBMIT_TYPE_ADD_MEMBER = 'member';
const SUBMIT_TYPE_ADD_OTHER_MEMBER = 'other';

const EditUser = (props) => {

    const alertUseAlert = useAlert();
    const dispatch = useDispatch();

    const [value, setValue] = useState({
        researchGroupId: props.group ? props.group.id : 1,
        roleOfGroupId: 2,
        username: 1

    });

    const [members, setMembers] = useState(props.group ? props.group.groupDetailList : {})
    // eslint-disable-next-line
    const [searchMember, setSearchMember] = useState(null)
    
    const handleChange = (field, value) => {
        setValue(previousState => ({...previousState, [field]: value }))
    }   

    useEffect(() => {
        dispatch(retrieveResearchGroupById(props.match.params.id))
        .then(res => {
            setMembers(res.payload.groupDetailList)
        })
        dispatch(retrieveRoleOfGroups())
        .then(res => {
            handleChange('roleOfGroupId', res.payload[0].id)
        })
        dispatch(retrieveDomains())
        dispatch(retrieveResearcherUsers())
        .then(res => {
            handleChange('username', res.payload[0].username)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRoleChange = (roleId) => {
        handleChange('roleOfGroupId', roleId)
    }
    const onUserChange = (userProfileId) => {
        handleChange('username', userProfileId)
    }

    const handleSubmit = (e, submitType, submitValue) => {
        e.preventDefault()

        if(submitType === SUBMIT_TYPE_ADD_MEMBER) {
            dispatch(addMemberToGroup(submitValue))
            .then(res => {
                if(res.error){
                    alertUseAlert.error(res.error.message);
                }
                else {
                    setMembers(res.payload)
                    alertUseAlert.success(MESSAGE_ADD_SUCCCESS)
                }
            })
        }
        
        if(submitType === SUBMIT_TYPE_ADD_OTHER_MEMBER) {
            const updateValue = {
                ...submitValue,
                researchGroupId: value.researchGroupId,
                roleOfGroupId: value.roleOfGroupId
            }

            dispatch(addOtherMemberToGroup(updateValue))
            .then(res => {
                if(res.error){
                    alertUseAlert.error(res.error.message);
                }
                else {
                    setMembers(res.payload)
                    document.getElementById("add-other-member").reset();
                    alertUseAlert.success(MESSAGE_ADD_SUCCCESS)
                }
            })
            
        }
        
    }

    const renderComboboxRoles = () => {
        return (
            <div className="col">
                <section className="row justify-content-between">
                    <Combobox 
                        data={props.users} 
                        onChecked={onUserChange} 
                        label="Tên thành viên"
                        type="user"
                    />
                </section>
                <section className="row justify-content-between">
                    <Combobox 
                        data={props.rolesOfGroup} 
                        selectedIndex={2} 
                        onChecked={onRoleChange}
                        label="Chọn vai trò của thành viên"
                        type="roleofgroup" 
                    />
                </section>
            </div>
        )
    }

    const renderSearchMember = () => {
        return (
            <>
                <div className="grid">
                    <div className="d-flex mt-4 ">
                        { renderComboboxRoles() }
                    </div>
                    
                    <div className="d-flex mt-4 justify-content-end">
                        <button 
                            className="btn btn-success rounded-3"
                            onClick={e => handleSubmit(e, SUBMIT_TYPE_ADD_MEMBER, value)}
                        >
                            Thêm thành viên
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const renderOutsiteMember = () => {
        return (
            <FormOutsideMember 
                btnText="Thêm thành viên"
                buttonName="Sửa"
                rolesOfGroup={props.rolesOfGroup}
                type='add'
                handleSubmit={(e, submitValue) => handleSubmit(e, SUBMIT_TYPE_ADD_OTHER_MEMBER, submitValue)}
            />
        )
    }

    const renderRows = (rows) => {
        if(rows && rows.length > 0){
            return rows.map((row, index) => {
                const haveAccount = (
                    <div className="form-check" key={index}>
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={row.userProfile ? row.userProfile.username : row.username}
                            disabled={true}
                        />
                    </div>
                )

                return {
                    ...row,
                    stt: index + 1,
                    username: row.userProfile?.username ?? row.username,
                    fullName: row.userProfile?.fullName ?? row.fullName,
                    email: row.userProfile?.email ?? row.email,
                    haveAccount
                }
            })
        }
    }

    const onDelete = (id) => {
        dispatch(deleteMemberFromGroup(id))
        .then(() => {
            setMembers(previousState => previousState.filter(member => member.id !== id))
        })
    }

    const renderDatatableMembers = (groupId) => {
        return (
            <AdminManageInfo 
                header={header}
                columns={columns}
                data={props.roles ? props.roles : []}
                formData={members ? renderRows(members) : []}
                name={'users'}
                title={'DANH SÁCH THÀNH VIÊN'}
                // disableEdit={true}
                useLink={true}
                isEditMemberOfGroup={true}
                groupId={groupId}
                links={
                    {
                        editLink: '/admin/research-groups/edit-member',
                    }
                }
                onDelete={onDelete}
                useCustomOnDelete={true}
            />
        )
    }

    return (

        <>
            <ArrowBack />
            <div 
                className="container"
            >    <div className="mb-4 text-center">
                    <h4>THÊM THÀNH VIÊN</h4>
                </div>
                <div className='row'>
                    <div className="mt-2 col-5">
                        { renderSearchMember() }
                    </div>
                    <div className="mt-2 col-7">
                        { renderOutsiteMember() }
                    </div>
                </div>
                <div className='row'>
                    { renderDatatableMembers(props.match.params.id) }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        group: state.researchGroupsAdmin.data[ownProps.match.params.id],
        rolesOfGroup: Object.values(state.roleOfGroupAdmins.data),
        domains: Object.values(state.domainsAdmin.data),
        users: Object.values(state.usersAdmin.data),
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(EditUser);

  