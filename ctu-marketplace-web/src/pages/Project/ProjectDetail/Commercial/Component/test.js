import React from 'react';

import ProjectPreview from '../../../../../components/ProjectPreview';

import { fields as commercialFields } from '../../../../../components/ProjectPreview/commercialFields'
import { fields as researchingFields } from '../../../../../components/ProjectPreview/researchingFields'
import { fields as ideaFields } from '../../../../../components/ProjectPreview/ideaFields'

const ProjectDetail = (props) => {

    const renderComponent = () => {
        const { project, relatedProjects } = props;

        if(project){
            let generalInfo = {};
            let detail = {};

            if(project.projectType && project.projectType === 'commercial'){
                generalInfo = commercialFields.navbar;
                detail = commercialFields.content;
            }
            if(project.projectType && project.projectType === 'researching'){
                generalInfo = researchingFields.navbar;
                detail = researchingFields.content;
            }
            if(project.projectType && project.projectType === 'idea'){
                generalInfo = ideaFields.navbar;
                detail = ideaFields.content;
            }

            return (
                <ProjectPreview 
                    previewType='preview' 
                    project={project}
                    relatedProjects={relatedProjects}
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

export default ProjectDetail;
