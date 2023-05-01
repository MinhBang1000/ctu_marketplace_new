// import { steps } from './steps.data';

import _ from 'lodash';
import React, { useState } from 'react';

import { Button, Form, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fields as projectFieldsCommercial } from '../../../components/ProjectPreview/commercialFields';
import { fields as projectFieldsIdea } from '../../../components/ProjectPreview/ideaFields';
import { fields as projectFieldsResearching } from '../../../components/ProjectPreview/researchingFields';
import Modal from '../../Modal';
import Template from '../../ProjectPreview';

const defaultModalConfig = {
    title: '',
    body: ''
}

const StepperCustom = (props) => {

    const [isFormValid, setValidForm] = useState(true)
    const [modalConfig, setModalConfig] = useState(defaultModalConfig)
    // const [template, setTemplate] = useState(templateTypes ? templateTypes[0] : [])

    const history = useHistory();

    const { t } = useTranslation('common');

    const { 
        projectFields,
        projectType,
        renderText,
        renderTextArea,
        renderEditor,
        renderCheckbox,
        renderCheckboxTreeView,
        renderInputImage,
        
        handleSubmit, isLoading,
        steps, activeStep, setActiveStep,
        setBlockedStep,
        template, setTemplate, templateTypes
    
    } 
        = props

    const [skipped, setSkipped] = useState(new Set());
    // eslint-disable-next-line no-unused-vars
    const [openTab, setOpenTab] = useState(0);
    
    const findFormErrors = (stepFields) => {
        const newErrors = {}

        if(!props.projects){
            Object.values(stepFields)
            .map(field => {
                if(field.isRequired){
                    if(!props.projects && !props.project[field.fieldName]){
                        newErrors[field.fieldName] = 'This field is required'
                    }
                    else {
                        if("comDevLevelList" === field.fieldName || "comTransMethodList" === field.fieldName || "projectFieldList" === field.fieldName){
                            if(props.project[field.fieldName]?.length === 0){
                                newErrors[field.fieldName] = 'This field is required'
                            }
                        }
                       else  _.omit(newErrors,field.fieldName)
                    }
                }
                return null;
            })
        }
       
        return newErrors
    }

    const isStepOptional = (step) => {
        // return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const renderSteps = () => {
        if(steps && steps.length > 0){
            return (
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = <div variant="caption">Optional</div>;
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{ t(`researcher.project-create.steps.${label}`) }</StepLabel>
                            </Step>
                        );
                    })}
                    
                </Stepper>
            );
        }
        return null;
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStep = (stepFields) => {
        if(stepFields){
            const textFields = Object.values(stepFields)
                            .filter(field => field.type === 'text' || field.type === 'email')
            const textareaFields = Object.values(stepFields)
                                .filter(field => field.type === 'textarea')
            const editorFields = Object.values(stepFields)
                                .filter(field => field.type === 'editor')
            const checkboxFields = Object.values(stepFields)
                                .filter(field => field.type === 'checkbox')
            const checkboxTreeViewFields = Object.values(stepFields)
                                .filter(field => field.type === 'checkboxTreeView')
            const imageFields = Object.values(stepFields)
                                .filter(field => field.type === 'image')

            return (
                <Form>
                    <div className='d-flex flex-column gap-2'>
                        { renderText(textFields) }
                        { renderTextArea(textareaFields) }
                        { renderEditor(editorFields) }
                        { renderCheckbox(checkboxFields) }
                        { renderCheckboxTreeView(checkboxTreeViewFields) }
                        { renderInputImage(imageFields) }
                    </div>
                </Form>
            )
        }
    };
    
    const onDropdownSelect = (selectedTemplate) => {
        setTemplate(selectedTemplate)
    }

    const renderList = () => {
        return templateTypes.map((type, index) => {
            return (
                <Dropdown.Item key={index} onClick={() => onDropdownSelect(type)}>
                    { t(`researcher.project-create.templates.${type.code}`) }
                </Dropdown.Item>
            )
        })
    }

    const renderPreview = () => {

        let projectFieldsPreview = [];
        if(projectType === 'commercial'){
            projectFieldsPreview = projectFieldsCommercial;
        }
        if(projectType === 'researching'){
            projectFieldsPreview = projectFieldsResearching;
        }
        if(projectType === 'idea'){
            projectFieldsPreview = projectFieldsIdea;
        }

        return (
            <div className='row'>
                <div className='p-0 mb-2'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            { t(`researcher.project-create.templates.${template.code}`) ?? t('researcher.project-create.dropdown-select-type') }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { renderList() }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Template
                    isEnableChangeTemplate={{
                        template: template ? template.value : 1
                    }}
                    previewType='create' 
                    project={props.project} 
                    navbar={projectFieldsPreview.navbar}
                    content={projectFieldsPreview.content}
                />
            </div>
        );
    };

    const renderAdminOptions = () => {
        return (
            <>
                Admin Steps
            </>
        )
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return renderStep(projectFields.generalInfo) ;
            case 1:
                if(openTab === 0){
                }
                // if(openTab === 1){
                //     console.log('duAnNghienCuu', duAnNghienCuu); 
                // }
                return renderStep(projectFields.detail);
            case 2:
                if(openTab === 0){
                }
                if(openTab === 1){
                }
                return renderPreview();
            case 3:
                return renderAdminOptions();
            default:
                return 'Unknown step';
        }
    }

    const renderStepContent = () => {
        if(activeStep === steps.length){
            handleSubmit();
        }
        if(steps && steps.length > 0){
            return (
                <div>
                    {activeStep === steps.length ? 
                    (
                        isLoading
                            ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            )
                            : (
                                <div>
                                    <div>
                                        All steps completed - you&apos;re finished
                                    </div>
                                    <Button onClick={handleReset} className="stepper--btn">
                                        Reset
                                    </Button>
                                </div>
                            )
                           
                    ) 
                    : (
                        <div className="flex flex-col justify-between">
                            <div>
                                {getStepContent(activeStep)}
                            </div>
                            
                        </div>
                    )}
                </div>
            
            );
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const handleNext = (e) => {
        let checkedFields;
        if(activeStep === 0){
            checkedFields = projectFields.generalInfo;
        }
        else checkedFields = projectFields.detail;
        
        const fieldErrors = findFormErrors(checkedFields)
        if(Object.keys(fieldErrors).length === 0){
            setValidForm(true)
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setBlockedStep(-1)
            setSkipped(newSkipped);

            if(activeStep === steps.length - 1){
                // props.onStepperFinished();
                handleSubmit(e);
            }
        }
        // else setValidForm(false)
        else {
            // alertUseAlert.show('Vui lòng kiểm tra thông tin nhập')
            setValidForm(false)
            console.log(fieldErrors)
            console.log(props.project)
            setBlockedStep(activeStep)
            setModalConfig({
                title: 'Thông báo',
                body: 'Vui lòng kiểm tra thông tin nhập',
                closeButton: 'Đóng'
            })
        }
    };

    const onSaveTemp = (e) => {
        e.preventDefault();

        handleSubmit(e, true);
        
        // const updateProject = {...props.project, projectType, statusId: 104};
        // localStorage.setItem('project', JSON.stringify(props.project));
        // setTimeout(() => {
        //     history.push('/san-pham/thuong-mai')
        // }, 500);
        
    };


    return (
        <div className='container'>
            <div className='row'>
                { renderSteps(steps) }
            </div>
            
            <div className='row'>
               { renderStepContent() }
            </div>

            {
                !isLoading
                ? (
                    <div style={{ minHeight: '100px' }}>
                        <div 
                            className='d-flex gap-2 mt-2 justify-content-end'
                        >
                            <Button 
                                disabled={activeStep === 0} 
                                onClick={handleBack} 
                                className="stepper--btn"
                            >
                                { t('researcher.project-create.form.btnBack') }
                            </Button>
                            {isStepOptional(activeStep) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                >
                                    Bỏ qua
                                </Button>
                            )}
                            <Button
                                className="text-white bg-blue-500 stepper--btn"
                                onClick={handleNext}
                            >
                                { 
                                    steps
                                    ? activeStep === steps.length - 1 ? t('researcher.project-create.form.btnSend') : t('researcher.project-create.form.btnNext')
                                    : null 
                                }
                            </Button>

                            <Button 
                                className="text-white bg-secondary stepper--btn"
                                onClick={(e) => onSaveTemp(e)}
                            >
                                { t('researcher.project-create.form.btnDraft') }
                            </Button>
                            
                            <Modal 
                                isFormValid={isFormValid} 
                                setValidForm={(status) => setValidForm(status)}
                                modalConfig={modalConfig}
                            />
                        </div>
                    </div>
                )
                : null
            }
        </div>
    )
}
export default StepperCustom;