import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";

import { 
    retrieveCommercialById, 
    retrieveResearchingById,
    retrieveIdeaById,

} from '../../../../store/admin.projectSlice'

import ProjectPreview from '../../../../components/ProjectPreview'
import { fields as commercialFields } from '../../../../components/ProjectPreview/commercialFields'
import { fields as researchingFields } from '../../../../components/ProjectPreview/researchingFields'
import { fields as ideaFields } from '../../../../components/ProjectPreview/ideaFields'

const TYPE_PROJECT_COMMERCIAL = 'commercial';
const TYPE_PROJECT_RESEARCHING = 'researching';
const TYPE_PROJECT_IDEA = 'idea';

const AdminProjectPreviewPage = (props) => {

    const [project, setProject] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(props.match.params.projectType){
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderComponent = () => {
        if(project){
            let generalInfo = {};
            let detail = {};

            if(project.projectType && project.projectType === TYPE_PROJECT_COMMERCIAL){
                generalInfo = commercialFields.navbar;
                detail = commercialFields.content;
            }
            if(project.projectType && project.projectType === TYPE_PROJECT_RESEARCHING){
                generalInfo = researchingFields.navbar;
                detail = researchingFields.content;
            }
            if(project.projectType && project.projectType === TYPE_PROJECT_IDEA){
                generalInfo = ideaFields.navbar;
                detail = ideaFields.content;
            }

            return (
                <ProjectPreview 
                    previewType='preview' 
                    project={project}
                    navbar={generalInfo}
                    content={detail}
                />
            )
        }
        return null
    }

    return (
        <>
            { renderComponent() }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        project: state.projectsAdmin.data[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    {}
)(AdminProjectPreviewPage);