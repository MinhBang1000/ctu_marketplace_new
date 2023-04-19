import axios from 'axios';
import _ from 'lodash';
import { fields as projectFields } from '../../../../components/ProjectCreate/ideaFields';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import environment from '../../../../environments/environment';
import authHeader from '../../../../services/auth.header';

import ProjectCreate from '../../../../components/ProjectCreate';
import { steps } from './steps.data';

import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { ROUTE_NNC_PROJECTS } from '../../../../components/Router/constants';
import { SEO_PROJECT_CREATE } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';

const ProjectCreateIdeaPage = (props) => {
    const userId = useSelector((state) => state.auth.data.userProfile.data.id);
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const alert = useAlert();

    // let shouldBlockNavigation = props.isBlockNavigation;

    // const doSomethingBeforeUnload = () => {
    //     const projectTemp = props.location.state ? props.location.state.projectTemp : null
    // }

    useEffect(() => {
        seo({
            title: SEO_PROJECT_CREATE.idea.title,
            metaDescription: SEO_PROJECT_CREATE.idea.metaDescription
        });
    }, [])

    const submitForm = (project) => {
        const isDraft = project?.statusId === 104;
        let URL = '/researcher/projects/idea' + (isDraft ? "/draft" : "");

        const updateProject = {
            ...project, 
            fieldIdList: project.projectFieldList,
        };

        const omitProject = _.omit(updateProject, ['projectFieldList']);

        setLoading(true);
        axios.post(
                environment.url.java + URL, 
                {...omitProject, userId: userId}, 
                { headers: authHeader() } 
            )
            .then(response => {
                if (response) {
                    setLoading(false);
                    history.push(ROUTE_NNC_PROJECTS);
                }
            })
            .catch(error => {
                setLoading(false);
                const message = error?.response?.data?.message;
                alert.error(message);
            })
    }

    const handleSubmit = (e, project) => {
        if(e){
            e.preventDefault();
            submitForm(project)
        }
    }

    const renderComponent = () => {
        if(steps){
            return (
                <>
                    <ProjectCreate 
                        projectFields={projectFields}
                        projectType='idea'
                        type='create'
                        steps={steps}
                        activeStep={props.activeStep}
                        setActiveStep={props.setActiveStep}
                        handleSubmit={(e, project) => handleSubmit(e, project)}
                        isLoading={isLoading}
                    />
                </>
            ); 
        }
        return null;
    }

    
    return (
        <>
            { renderComponent() }
        </>
    ); 
};

export default ProjectCreateIdeaPage;