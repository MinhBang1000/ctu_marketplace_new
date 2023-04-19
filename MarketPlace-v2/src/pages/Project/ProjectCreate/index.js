import React, { useState, useEffect } from 'react';

import { 
    Dropdown

} from 'react-bootstrap'

import CreateCommercialProject from '../ProjectCreate/Commercial';
import CreateResearchingProject from '../ProjectCreate/Researching';
import CreateIdeaProject from '../ProjectCreate/Idea';

import { projectTypes } from './project.type' 

import { seo } from '../../../libs/helper'
import { SEO_PROJECT_CREATE } from '../../../libs/constants-seo'
import { useTranslation } from 'react-i18next';

const ProjectCreatePage = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [projectType, setProjectType] = React.useState({});

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_PROJECT_CREATE.full.title,
            metaDescription: SEO_PROJECT_CREATE.full.metaDescription
        });

        setProjectType({ code: 'TM' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onDropdownSelect = (type) => {
        setProjectType(type);
    }

    const renderList = () => {
        return projectTypes.map((type, index) => {
            return (
                <Dropdown.Item key={index} onClick={() => onDropdownSelect(type)}>
                    { t(`researcher.project-create.project-types.${type.code}`) }
                </Dropdown.Item>
            )
        })
    }

    const renderForm = (projectType) => {
        if(projectType.code === 'TM'){
            return <CreateCommercialProject activeStep={activeStep} setActiveStep={setActiveStep} />
        }
        else if(projectType.code === 'NC'){
            return <CreateResearchingProject activeStep={activeStep} setActiveStep={setActiveStep} />
        }
        else if(projectType.code === 'YT'){
            return <CreateIdeaProject activeStep={activeStep} setActiveStep={setActiveStep} />
        }

    }

    return (
        <div className='container mt-4 mb-4'>
            <div className='row'>
                {activeStep !== 2 && (
                    <div className='col-lg-3'>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                { t(`researcher.project-create.project-types.${projectType.code}`) ? t(`researcher.project-create.project-types.${projectType.code}`) : t('researcher.project-create.dropdown-select-type') }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                { renderList() }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
                <div className={`${activeStep === 2 ? "col-lg" : "col-lg-9"}`}>
                    { renderForm(projectType) }
                </div>
            </div>
        </div>
    )
}
export default ProjectCreatePage;