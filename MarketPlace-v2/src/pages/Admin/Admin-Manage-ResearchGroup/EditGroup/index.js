import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import ArrowBack from '../../../../components/ArrowBack';

import { retrieveResearchGroupById } from '../../../../store/admin.researchGroupSlice'

import FormGroup from './Form'
import { columns as columnsNormalUser } from './table-definition'

const AdminEditGroup = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveResearchGroupById(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <ArrowBack />
            <h6 className="mb-4 text-center text-uppercase">
                Chỉnh sửa nhóm nghiên cứu
            </h6>
            <FormGroup columns={columnsNormalUser} group={props.group} />
        </>
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
)(AdminEditGroup);
