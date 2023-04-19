import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import Group from './Components/Group';

import { retrieveResearchGroups } from '../../store/researchGroupSlice';

import { SEO_GROUP } from '../../libs/constants-seo';
import { seo } from '../../libs/helper';

const GroupPage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        seo({
            title: SEO_GROUP.title,
            metaDescription: SEO_GROUP.metaDescription
        });

        dispatch(retrieveResearchGroups())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderList = () => {
        if(props.groups && props.groups.length){
            return (
                <Group groups={props.groups ? props.groups : {} } />
            )
        }
        return <div>Không có nhóm nghiên cứu</div>
    }

    return (
        <>
            { renderList() }
        </>
    )
}
const mapStateToProps = state => {
    return {
        groups: state.researchGroups.data ? Object.values(state.researchGroups.data) : {name: 'kyhuynh'},
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(GroupPage);