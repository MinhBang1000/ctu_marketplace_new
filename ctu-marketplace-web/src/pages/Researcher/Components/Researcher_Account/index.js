import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import PersonalInformaton from './personal-infomation'
import { retrieveUserByUsername } from '../../../../store/admin.userSlice'
import { retrieveDomains } from '../../../../store/researcher.domainSlice'

import { seo } from '../../../../libs/helper'
import { SEO_RESEARCHER_HOME } from '../../../../libs/constants-seo'

const AdminManageUser = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        seo({
            title: SEO_RESEARCHER_HOME.title,
            metaDescription: SEO_RESEARCHER_HOME.metaDescription
        });

        dispatch(retrieveUserByUsername(props.username));
        dispatch(retrieveDomains());
    // eslint-disable-next-line
    }, [])

    const renderComponent = () => {
        if (props.user) {
            return (
                <PersonalInformaton 
                    user={props.user} 
                    domains={props.domains}
                />
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

const mapStateToProps = (state) => {
    return { 
        user: state.usersAdmin.data[state.auth.data.userProfile.data.id],
        username: state.auth.data.userProfile.data.username,
        domains: Object.values(state.researcherDomains.data),
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(AdminManageUser);