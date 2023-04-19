import React from 'react';
import { connect } from 'react-redux';

import Form from '../Components/Form'

const AdminManageAddOrEdit = (props) => {

    const { user } = props;

    const renderComponent = () => {
        if(user){
            return (
                <Form user={user} type={'edit'}/>
            )
        }

        return null;
    }

    return (
        <>
            { renderComponent() }
        </>
    )

    
}

const mapStateToProps = (state, ownProps) => {
    return { 
        user: state.usersAdmin.data[ownProps.match.params.id],
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(AdminManageAddOrEdit);