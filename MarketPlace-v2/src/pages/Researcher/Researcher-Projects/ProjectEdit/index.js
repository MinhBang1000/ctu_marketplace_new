import axios from 'axios';
import _ from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fields as projectFieldsCommercial } from '../../../../components/ProjectCreate/commercialFields';
import { fields as projectFieldsIdea } from '../../../../components/ProjectCreate/ideaFields';
import { fields as projectFieldsResearching } from '../../../../components/ProjectCreate/researchingFields';

import React, { useEffect, useState } from 'react';

import environment from '../../../../environments/environment';
import authHeader from '../../../../services/auth.header';

import { retrieveCommercialById, retrieveIdeaById, retrieveResearchingById } from '../../../../store/researcher.projectSlice';

import ProjectCreate from '../../../../components/ProjectCreate';
import { steps } from './steps.data';

import { useAlert } from 'react-alert';
import ArrowBack from '../../../../components/ArrowBack';
import { SEO_RESEARCHER_EDIT_PROJECT } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';

const TYPE_PROJECT_COMMERCIAL = 'commercial';
const TYPE_PROJECT_RESEARCHING = 'researching';
const TYPE_PROJECT_IDEA = 'idea';

const ProjectCreatePage = (props) => {

    const [project, setProject] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        seo({
            title: SEO_RESEARCHER_EDIT_PROJECT.title,
            metaDescription: SEO_RESEARCHER_EDIT_PROJECT.metaDescription
        });
        if(props.match.params.projectType && props.match.params.id !== "0") {
            if(props.match.params.projectType === TYPE_PROJECT_COMMERCIAL){
                dispatch(retrieveCommercialById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                    });
            }
            if(props.match.params.projectType === TYPE_PROJECT_RESEARCHING){
                dispatch(retrieveResearchingById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                    });
            }
            if(props.match.params.projectType === TYPE_PROJECT_IDEA){
                dispatch(retrieveIdeaById(props.match.params.id))
                    .then(response =>  {
                        setProject(response.payload)
                    });
            }
        }
        else if(props.match.params.id === "0"){
            const projectLocalStorage = localStorage.getItem("project");
            let projectData = JSON.parse(projectLocalStorage);

            let comDevLevelList = []
            let comTransMethodList = []
            let projectFieldList = []
            if(projectData?.comDevLevelList){
                comDevLevelList = projectData.comDevLevelList.map(item => {
                    return {
                        "devLevel": {
                            id: item.developmentLevelId
                        },
                        "note": item.note
                    }
                })
            }
            if(projectData?.comTransMethodList){
                comTransMethodList = projectData.comTransMethodList.map(item => {
                    return {
                        "transMethod": {
                            id: item.transMethodId
                        },
                        "note": item.note
                    }
                })
            }
            if(projectData.projectFieldList && Object.values(projectData.projectFieldList).length > 0){
                projectFieldList = projectData.projectFieldList.map(id => {
                    return {
                        "field": {
                            id
                        }
                    }
                })
            }

            projectData = {...projectData, id: 0, status: {id: 0, name: "Nháp"}, comDevLevelList, comTransMethodList, projectFieldList};
            setProject(projectData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const submitForm = (data) => {
        // event.preventDefault();

        // resetAllField();

        // props.unblock_navigation();
        let URL = '';
        const { projectType, id } = props.match.params;
        if(projectType === TYPE_PROJECT_COMMERCIAL){
            URL = '/researcher/projects/commercial';
        }
        if(projectType === TYPE_PROJECT_RESEARCHING){
            URL = '/researcher/projects/researching';
        }
        if(projectType === TYPE_PROJECT_IDEA){
            URL = '/researcher/projects/idea';
        }

        const isDraft = data?.statusId === 104;
        URL = URL + (isDraft ? "/draft" : "");

        const userDataLocalStorage = localStorage.getItem("userData");
        const user = JSON.parse(userDataLocalStorage);

        const updateData = {
            ...data, 
            userId: user.data.id,
            fieldIdList: data?.projectFieldList,
            // fieldIdList: data.projectFieldList.map(field => field.field.id),
        };
        const omitData = _.omit(updateData, ['user', 'status', 'projectFieldList']);

        const removedNullAndUndefinedData = _.omitBy(omitData, _.overSome([_.isNil, _.isNaN]))
        let removedEmtyArray = removedNullAndUndefinedData;
        if(removedNullAndUndefinedData?.fieldIdList?.length === 0){
            removedEmtyArray = _.omit(removedEmtyArray, ["fieldIdList"])
        }

        // Final data that will be send to server
        const finalData = removedEmtyArray

        setLoading(true);
        axios.put(
                `${environment.url.java}${URL}/${id}`, 
                finalData, 
                { headers: authHeader() } 
            )
            .then(response => {
                if (response) {
                        setLoading(false);
                        setTimeout(() => {
                            let redirectURL = '';
                            if(projectType === TYPE_PROJECT_COMMERCIAL){
                                redirectURL = '/san-pham/thuong-mai'
                            }
                            if(projectType === TYPE_PROJECT_RESEARCHING){
                                redirectURL = '/san-pham/nghien-cuu'
                            }
                            if(projectType === TYPE_PROJECT_IDEA){
                                redirectURL = '/san-pham/y-tuong'
                            }
                            history.push(redirectURL)
                        }, 500);
                }
            })
            .catch(error => {
                setLoading(false);
                const message = error?.response?.data?.error;
                alert.error(message);
            })
    }

    const handleSubmit = (e, project) => {
        if(e){
            e.preventDefault();
            submitForm(project)
        }
    }

    const renderProject = () => {
        if(project && Object.values(project)){
            let projectFields = [];
            if(project.projectType === TYPE_PROJECT_COMMERCIAL){
                projectFields = projectFieldsCommercial
            }
            if(project.projectType === TYPE_PROJECT_RESEARCHING){
                projectFields = projectFieldsResearching
            }
            if(project.projectType === TYPE_PROJECT_IDEA){
                projectFields = projectFieldsIdea
            }

            return (
                <>
                    <ProjectCreate 
                        projectFields={projectFields}
                        projectType={project.projectType}
                        type='edit'
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        initProject={project ? project : null}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </>
            )
        }
        return (
            <>
                <ArrowBack />
                Nothing to show
            </>
        )
    }

    const renderComponent = () => {
        if(steps){
            return (
                <>
                    { renderProject() }
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

const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.researchProjects.data[ownProps.match.params.id],
    };
}

export default connect(
    mapStateToProps, 
    {}
)(ProjectCreatePage);