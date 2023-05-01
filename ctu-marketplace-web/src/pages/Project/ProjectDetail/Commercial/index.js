import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import ProjectDetail from './Component/test';

import { 
    retrieveCommercialProjectById, 
    retrieveResearchingProjectById,
    retrieveIdeaProjectById 
} from '../../../../store/projectCommercialSlice'

import { retrieveRelatedProjectsByProjectId }  from '../../../../store/relatedProjectsSlice'

import { seo } from '../../../../libs/helper'

const VN_PROJECT_TYPE_COMMERCIAL = 'thuong-mai';
const VN_PROJECT_TYPE_RESEARCHING = 'nghien-cuu';
const VN_PROJECT_TYPE_IDEA = 'y-tuong';

const ProjectDetailPage = (props) => {

    const [project, setProject] = useState({});
    const [relatedProjects, setRelatedProjects] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(props.match.params.projectType !== ''){
            if(props.match.params.projectType === VN_PROJECT_TYPE_COMMERCIAL){
                dispatch(retrieveCommercialProjectById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                        dispatch(retrieveRelatedProjectsByProjectId(response.payload.id))
                            .then(res => {
                                setRelatedProjects(res.payload)
                            });
                        seo({
                            title: response.payload.name,
                            metaDescription: response.payload.name
                        });
                    });
            }
            if(props.match.params.projectType === VN_PROJECT_TYPE_RESEARCHING){
                dispatch(retrieveResearchingProjectById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                        dispatch(retrieveRelatedProjectsByProjectId(response.payload.id))
                            .then(res => {
                                setRelatedProjects(res.payload)
                            });
                        seo({
                            title: response.payload.name,
                            metaDescription: response.payload.name
                        });
                    });
            }
            if(props.match.params.projectType === VN_PROJECT_TYPE_IDEA){
                dispatch(retrieveIdeaProjectById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                        dispatch(retrieveRelatedProjectsByProjectId(response.payload.id))
                            .then(res => {
                                setRelatedProjects(res.payload)
                            });
                        seo({
                            title: response.payload.name,
                            metaDescription: response.payload.name
                        });
                    });
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderComponent = () => {
        if(project){
            return (
                <ProjectDetail 
                    project={project}
                    relatedProjects={relatedProjects}
                />
            )
        }

        return null;
    }

    return (
       <>
            { renderComponent() }
       </>
    )}

const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.projectsCommercial[ownProps.match.params.id], 
        projects: state.projects 
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(ProjectDetailPage);