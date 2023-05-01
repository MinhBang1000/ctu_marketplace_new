import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import ProjectCreate from '../../../../components/ProjectCreate'
import { steps } from './steps.data'
import { fields as projectFields } from '../../../../components/ProjectCreate/commercialFields'

import { retrieveProjectById } from '../../../../store/admin.projectSlice'


const AdminProjectEdit = (props) => {

    const [project, setProject] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveProjectById(props.match.params.id))
        .then((response) => {
            setProject(response.payload)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [activeStep, setActiveStep] = useState(0);

    const renderProject = () => {
        if(project && Object.values(project)){
            return (
                <>
                    <ProjectCreate 
                        projectFields={projectFields}
                        type='edit'
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        initProject={project ? project : null}
                    />
                </>
            )
        }
        return null
    }

    return (
        <>
            { renderProject() }
        </>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.projects[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    {}
)(AdminProjectEdit);