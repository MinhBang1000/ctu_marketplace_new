import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import FormOutsideMember from '../../Components/FormOutsideMember';

import { retrieveResearchGroupById, updateOtherMemberOfGroup } from '../../../../../store/admin.researchGroupSlice';
import { retrieveRoleOfGroups } from '../../../../../store/admin.roleOfGroupSlice';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

const EditOutsideMember = (props) => {

    const [member, setMember] = useState(null);
    const [rolesOfGroup, setRolesOfGroup] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const { groupId, memberId } = props.match.params;
        dispatch(retrieveResearchGroupById(groupId))
        .then(res => {
            const members = res.payload.groupDetailList;
            const filterMember = members.filter(member => member.id.toString() === memberId);
            
            setMember(filterMember[0]);
        })

        dispatch(retrieveRoleOfGroups())
        .then(res => {
            setRolesOfGroup(res.payload);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmit = (e, submitValue) => {
        e.preventDefault();
        const updateValue = {
            ...submitValue,
            researchGroupId: Number(props.match.params.groupId),
            roleOfGroupId: submitValue.roleOfGroup.id,
        }
        const omitValue = _.omit(updateValue, ['roleOfGroup', 'userProfile']);

        dispatch(updateOtherMemberOfGroup(omitValue))
        .then(res => {
            history.push(`/admin/research-groups/add-member/${props.match.params.groupId}`);
        })
    }

    return (
        member ? 
        (
            <FormOutsideMember 
                btnText="Sửa thông tin thành viên"
                buttonName="Sửa"
                member={member}
                rolesOfGroup={rolesOfGroup}
                type='edit'
                handleSubmit={(e, submitValue) => handleSubmit(e, submitValue)}
            />
        )
        : null
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        group: state.researchGroupsAdmin.data[ownProps.match.params.id],
    };
};
  
export default connect(
    mapStateToProps,
    {}
)(EditOutsideMember);