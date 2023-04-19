/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ArrowBack from '../../../components/ArrowBack';

import { deleteProjectById, retrieveProjectsByResearcherId, retrieveProjectsByUseridProjecttypeStatusid } from '../../../store/researcher.projectSlice';
import { retrieveStatuses } from '../../../store/researcher.statusSlice';

import _ from 'lodash';
import Filter from '../../Admin/Admin-Manage-Project/Filter';
import ProjectList from './ProjectList';

import { useAlert } from 'react-alert';
import { SEO_RESEARCHER_PROJECTS } from '../../../libs/constants-seo';
import { seo } from '../../../libs/helper';

const STATUS_ID_DD = 101;

const AdminManageUser = (props) => {

    const [openTab, setOpenTab] = useState(0);

    const [status, setStatus] = useState({});
    const [query, setQuery] = useState({
        projectType: 'commercial',
        statusId: -1,
        isInitialValue: true,
    });

    const [projects, setProjects] = useState(props.projects ? props.projects : []);

    const user = useSelector((state) => state.auth.data.userProfile.data);
    const dispatch = useDispatch();
    const alert = useAlert()

    const addTempProjectToProjectsIfExist = (initialProjects) => {
        const projectLocalStorage = localStorage.getItem("project");
        let project = JSON.parse(projectLocalStorage);
        if(project){
            project = {...project, id: 0, status: {id: 0, name: "Nháp"}, projectType: "commercial"};
            initialProjects = [...initialProjects, project];
        }

        setProjects(initialProjects)
    }

    useEffect(() => {
        seo({
            title: SEO_RESEARCHER_PROJECTS.title,
            metaDescription: SEO_RESEARCHER_PROJECTS.metaDescription
        });

        dispatch(retrieveProjectsByResearcherId(user.id))
            .then(res => {
                setProjects(res.payload)
            })
        
        dispatch(retrieveStatuses())
            .then(res => {
                const updatedData = [{ code: "ALL", id: -1, name: "All"}, ...res.payload];
                setStatus(updatedData)
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(query && !query.isInitialValue) {
            if(query.statusId.toString() === "-1") {
                dispatch(retrieveProjectsByResearcherId(user.id))
                .then(res => {
                    setProjects(res.payload.filter(x => x.projectType === query.projectType))
                })
            }

            else {
                dispatch(retrieveProjectsByUseridProjecttypeStatusid({
                    userId: user.id,
                    projectType: query.projectType,
                    statusId: query.statusId,
                }))
                .then(res => {
                    setProjects(res.payload)
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const onOpenedTabChange = (opendTab) => {
        setOpenTab(opendTab);
    };

    const handleFilterChange = (name, value) => {
        setQuery(previousState => ({...previousState, [name]: value, isInitialValue: false }))
    }

    const handleComboboxChange = (e) => {
        handleFilterChange('projectType', e.target.value)
    }
      
    const handleRadioClick = (e) => {
        handleFilterChange('statusId', e.target.value)
    }

    const onDelete = (id) => {
        dispatch(deleteProjectById(id))
            .then((res) => {
                const error = res.payload?.error;
                if(error){
                    alert.error(error.error);
                }
                else setProjects(projects.filter(project => project.id !== id));
            })
    }

    const renderConditionDisableDeleteForEachItem = () => {
        let filteredItems = [];
        if(projects && projects.length > 0){
                filteredItems = projects.map(project => {
                    return {
                        id: project.id,
                        isDisableDelete: project?.status?.id === STATUS_ID_DD
                    }
                }
            )
        }

        const result = _.mapKeys(filteredItems, 'id')

        return result
    }

    const renderDisableDelete = () => {
        return renderConditionDisableDeleteForEachItem()
    }

    return (
        <div className='container'>
            <ArrowBack />
            <Filter 
                handleComboboxChange={handleComboboxChange}
                handleRadioClick={handleRadioClick}
                projectTypes={[
                    {
                        value: 'commercial',
                        label: 'Sản phẩm thương mại'
                    },
                    {
                        value: 'researching',
                        label: 'Kết quả nghiên cứu'
                    },
                    {
                        value: 'idea',
                        label: 'Ý tường'
                    }
                ]}
                status={status ? status : []}
            />
            <ProjectList 
                projects={projects} 
                // eslint-disable-next-line eqeqeq
                disableDelete={renderDisableDelete()}
                onDelete={onDelete}
            />
        </div>
    )
}

export default AdminManageUser;