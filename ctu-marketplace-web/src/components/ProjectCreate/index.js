/* eslint-disable array-callback-return */
import environment from '../../environments/environment';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { DropzoneArea } from 'material-ui-dropzone';
import { Form } from 'react-bootstrap';
import CKEditor from '../../components/CKEditor/CKEditor4';

import authHeader from '../../services/auth.header';

import { retrieveDevelopmentLevels } from '../../store/developmentLevelSlice';
import { retrieveFields } from '../../store/fieldSlice';
import { retrieveTransmisstionMethods } from '../../store/transmisstionMethodSlice';

import CheckboxView from './CheckboxTreeView';
import Stepper from './Stepper';

import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import { templateTypes } from './template.types';

const OTHER_ID = '999'

const ProjectCreate = (props) => {


    const dispatch = useDispatch();

    const { t } = useTranslation('common');

    const { 
        projectFields, 
        projectType, 
        type, 
        steps, 
        activeStep, 
        setActiveStep, 
        initProject,
        isLoading 
    
    } = props

    const [selectedTransmissionMethodAndLevel, setSelectedTransmissionMethodAndLevel]= useState({
        comDevLevelList: [],
        comTransMethodList: []
    })
    const [isOtherInputOpen, setOtherInputOpen] = useState({
        comDevLevelList: false,
        comTransMethodList: false,
    })

    const [project, setProject] = React.useState({})
    const [stateFieldsChecked, setFieldsChecked] = useState({
        checked: [],
        expanded: []
    })
    const [blockedStep, setBlockedStep] = useState(-1);
    const [template, setTemplate] = useState(templateTypes ? templateTypes[0] : [])

    const initCheckboxDataField = (data, field) => {
        if(field && field.fieldName){
            if(type === 'create'){
                setSelectedTransmissionMethodAndLevel(previousState => (
                    { ...previousState,
                        [field.fieldName]: data
                    }
                ))
            }
            if(type === 'edit'){
                let renderData = [];
                if(data && Object.values(data).length > 0){
                    Object.values(data).map(item => {
                        if(item && item[field.fakeId] && item[field.fakeId].id){
                            renderData.push({ [field.childId]: '' + item[field.fakeId].id, name: item[field.fakeId].name, note: item.note })    
                        }
                    })
                }
                setSelectedTransmissionMethodAndLevel(previousState => (
                    { ...previousState,
                        [field.fieldName]: renderData
                    }
                ))
                setProject(previousState => (
                    { 
                        ...previousState,
                        [field.fieldName]: renderData,
                    }
                ))
            }
        }
    }
    
    useEffect(() => {
        dispatch(retrieveFields())
        dispatch(retrieveDevelopmentLevels())
        dispatch(retrieveTransmisstionMethods())
        
        let initData = {};
        let developmentLevels = [];
        let transmisstions = [];
        let fieldIds = [];

        if(type === 'create'){
            const projectLocalStorage = localStorage.getItem("project");
            const projectParseFromLocalStorage = JSON.parse(projectLocalStorage);
            if (projectParseFromLocalStorage) {
                initData = projectParseFromLocalStorage;
            }

            developmentLevels = initData.comDevLevelList;
            transmisstions = initData.comTransMethodList;
            fieldIds = initData.projectFieldList;
        }
        if(type === 'edit'){
            if(initProject && Object.values(initProject)){
                developmentLevels = initProject.comDevLevelList;
                transmisstions = initProject.comTransMethodList;

                if(initProject.projectFieldList && Object.values(initProject.projectFieldList).length > 0){
                    fieldIds = initProject.projectFieldList.map(field => {
                        return field?.field?.id
                    })
                }

                const foundTemplate = templateTypes.find(template => template.value === initProject.template)
                setTemplate(foundTemplate ?? template)

                initData = {...initProject, projectFieldList: fieldIds}
            }
        }

        setProject(initData)

        initCheckboxDataField(developmentLevels, projectFields.detail && projectFields.detail['comDevLevelList'])
        initCheckboxDataField(transmisstions, projectFields.detail && projectFields.detail['comTransMethodList'])

        setFieldsChecked({ checked: fieldIds })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleSubmit = (e, isDraft) => {
        let updatedProject = {...project, template: template.value}

        if(isDraft){
            updatedProject.statusId = 104;
        }

        props.handleSubmit(e, updatedProject)
    }
    
    const handleContentChange = (field, content) => {
        setProject({
            ...project,
            [field]: content
        })
    }

    //hàm tạo ra các trường input
    const renderText = (fields) => {
        const renderedItems = Object.values(fields).map(field => {
            return (
                <Form.Group key={field.fieldName}>
                    <Form.Label >
                        { t(`project.commercial.${field.fieldName}`) }
                        <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                    </Form.Label>
                    <Form.Control 
                        type={field.type} 
                        value={project[field.fieldName]}
                        onChange={(e) => handleContentChange(field.fieldName, e.target.value)}
                        isInvalid={ field.isRequired && !project[field.fieldName] && (blockedStep === field.step) }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { t(`project.commercial.${field.fieldName}`) + " " + t(`project.message-not-allow-null`) }
                    </Form.Control.Feedback>
                </Form.Group>
            )
        })
        
        return renderedItems
    }
    
    const renderTextArea = (fields) => {
        const renderedItems = Object.values(fields).map(field => {
            return (
                <Form.Group key={field.fieldName}>
                    <Form.Label>
                        { t(`project.commercial.${field.fieldName}`) }
                        <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={project[field.fieldName]}
                        onChange={(e) => handleContentChange(field.fieldName, e.target.value)}
                        isInvalid={ field.isRequired && !project[field.fieldName] && (blockedStep === field.step) }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { t(`project.commercial.${field.fieldName}`) + " " + t(`project.message-not-allow-null`) }
                    </Form.Control.Feedback>
                </Form.Group>
            )
        })
        
        return renderedItems
    }
    
    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        setProject( previousState => ({...previousState, [name]: data}))
    }

    const renderEditor = (fields) => {
        return Object.values(fields).map(field => {
            return (
                <div id={field.id} key={field.id} className="">
                    <label className="stepper--label" htmlFor={field.fieldName}>
                        { t(`project.commercial.${field.fieldName}`) }
                        <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                    </label>
                    <div className="">
                        <CKEditor 
                            field={field}
                            initData={project ? project[field.fieldName] : ''}
                            onChange={handleCKEditorChange}
                        />
                    </div>
                </div>
            )
        })
    }

    const handleOtherInputStatusChange = (field) => {
        setOtherInputOpen(previousState => ({...previousState, [field]: !previousState[field]}))
    }
    
    const handleOtherInputChange = (field, content) => {
        const FIELD_LEVEL_ID = 'developmentLevelId'
        const FIELD_TRANSMISSION_ID = 'transMethodId'

        const field_ID = field === 'comDevLevelList' ? FIELD_LEVEL_ID : FIELD_TRANSMISSION_ID

        setSelectedTransmissionMethodAndLevel(previousState => (
            { ...previousState,
                [field]: [
                    {
                        [field_ID]: OTHER_ID,
                        note: content
                    }
                ]
            }
        ))
        setProject({
            ...project,
            [field]: 
                [
                    {
                        [field_ID]: OTHER_ID,
                        note: content
                    }
                ]
        })
    }

    const handleMultipleCheckboxTransmissionChange = (field, id) => {

        const FIELD_LEVEL_ID = 'developmentLevelId'
        const FIELD_TRANSMISSION_ID = 'transMethodId'

        const field_ID = field === 'comDevLevelList' ? FIELD_LEVEL_ID : FIELD_TRANSMISSION_ID

        let selected = selectedTransmissionMethodAndLevel[field] ? selectedTransmissionMethodAndLevel[field] : [];
        
        let find = selected ? selected.some(item => (''+ item[field_ID]) === (''+ id)) : false
        
        if(find) { 
            selected = selected.filter(item => (''+ item[field_ID]) !== (''+ id))
        } else {
            selected.push({
                [field_ID]: id,
                note: ''
            })
        }

        if(('' + id) === OTHER_ID){
            handleOtherInputStatusChange(field)
        }

        setSelectedTransmissionMethodAndLevel(previousState => (
            { ...previousState,
                [field]: selected
            }
        ))

        setProject({
            ...project,
            [field]: selected
        })
        
    }

    const renderOtherInput = (field, childId) => {
        if(isOtherInputOpen[field.fieldName] && ('' + childId) === OTHER_ID){
            return (
                <Form.Control 
                    type='text' 
                    key={field.name}
                    value={ selectedTransmissionMethodAndLevel[field.fieldName][0] ? selectedTransmissionMethodAndLevel[field.fieldName][0].note : '' }
                    onChange={(e) => handleOtherInputChange(field.fieldName, e.target.value)} 
                />
            )
        }
    }

    const isCheckboxChecked = (field, id) => {
        if(selectedTransmissionMethodAndLevel[field.fieldName]){
            const isChecked = selectedTransmissionMethodAndLevel[field.fieldName].filter(item => {
                    if(field.fieldName === 'comDevLevelList'){
                        return ('' + item.developmentLevelId) === (''+ id)
                    }
                    if(field.fieldName === 'comTransMethodList'){
                        return ('' + item.transMethodId) === (''+ id)
                    }
            }).length > 0

            return isChecked;
        }
        return false
    }

    const renderCheckbox = (fields) => {
        const renderedItems = fields.map(field => {
            const renderedChildren = 
                        props[field.children]
                            ? Object.values(props[field.children].data).map(child => {
                                return (
                                    <>
                                        { !(isOtherInputOpen[field.fieldName])
                                            ? (
                                                <Form.Check 
                                                    key={child.name}
                                                    type="checkbox" 
                                                    label={child.name} 
                                                    checked={isCheckboxChecked(field, child.id)}
                                                    onChange={(e) => handleMultipleCheckboxTransmissionChange(field.fieldName, child.id )}
                                                />
                                            ) 
                                            : null
                                        }
                                        
                                        { renderOtherInput(field, child.id) }
                                    </>
                                )
                            })
                            : null
            return (
                <Form.Group key={field.fieldName}>
                    <Form.Label>
                        { t(`project.commercial.${field.fieldName}`) }
                        <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                    </Form.Label>
                    { (isOtherInputOpen[field.fieldName])
                        ? (
                            <Form.Check 
                                key={OTHER_ID}
                                type="checkbox" 
                                label={'Khác'} 
                                checked={isCheckboxChecked(field, OTHER_ID)}
                                onChange={(e) => handleMultipleCheckboxTransmissionChange(field.fieldName, OTHER_ID )}
                            />
                        ) 
                        : null
                    }
                    { renderedChildren }
                </Form.Group>
            )
        })
        
        return renderedItems
    }

    const renderCheckboxCategoryChildren = (field) => {
        if(field && field.childOfFieldList && field.childOfFieldList.length > 0){
            let children = [];
            if(field.childOfFieldList.length){
                field.childOfFieldList
                    .map(fieldChild => {
                        if(renderCheckboxCategoryChildren(fieldChild)){
                            return children.push({
                                value: `${fieldChild.id}`,
                                label: fieldChild.name,
                                children: renderCheckboxCategoryChildren(fieldChild)
                            })
                        }
                        return children.push({
                            value: `${fieldChild.id}`,
                            label: fieldChild.name,
                        })
                    })
            }
            
            if(children.length){
                return children
            }
            return null
        }

        return null;
    }

    const nodes = (props.fields) 
            ? Object.values(props.fields).map(field => {
                if(renderCheckboxCategoryChildren(field)){
                    return {
                        value: `${field.id}`,
                        label: `${ field.name }`,
                        children: renderCheckboxCategoryChildren(field)
                    }
                }
                return {
                    value: `${field.id}`,
                    label: field.name,
                }
            })
            : null;

    const onCheckboxTreeViewChecked = (checked) => {
        setFieldsChecked(previousState => ({...previousState, checked}))
        handleContentChange('projectFieldList', checked)
    }

    const renderCheckboxTreeView = (fields) => {
        return Object.values(fields).map(field => {
             if(field.type === 'checkboxTreeView') {
                 return (
                     <div id={field.id} key={field.id} className="">
                         <label className="self-center stepper--label" htmlFor="mucDoPhatTrien">
                            { t(`project.commercial.${field.fieldName}`) }
                            <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                         </label>
                         <div className="flex flex-col gap-2">
                             <CheckboxView 
                                id={field.fieldName} 
                                nodes={nodes} 
                                stateFieldIdList={stateFieldsChecked} 
                                setStateFieldIdListChecked={onCheckboxTreeViewChecked} 
                                setStateFieldIdListExpanded={expanded => setFieldsChecked(previousState => ({ ...previousState, expanded: expanded }))} 
                             />
                         </div>
                     </div>  
                 )
             }
             return null;
        })
    }

    const onProjectImageChange = (files) => {
            let formData = new FormData();
           
            formData.append("upload", files[0]);

            axios.post(environment.url.java + '/upload-file', formData, { headers: authHeader() } )
                .then(response => {
                    const imgSrc = response.data.url;

                    if (response.data) {
                        setProject(previousState => ({...previousState, projectImage: imgSrc}) )
                    } else {
                        return alert('failed to upload file')
                    }
                })
    }

    const renderInputImage = (fields) => {
        const renderedItems = Object.values(fields).map(field => {
            return (
                <Form.Group key={field.fieldName}>
                    <Form.Label>
                        { t(`project.commercial.${field.fieldName}`) }
                        <span className='text-danger'>{ field.isRequired ? " (*)" : null }</span>
                    </Form.Label>
                    <div>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={onProjectImageChange}
                            initialFiles={
                               [ project 
                                ? (project.projectImage ? project.projectImage : project.productImage) 
                                : logo
                            ]}
                        />
                        
                    </div>
                    {/* {
                        (field.isRequired && !project[field.fieldName])
                        && (
                            <Form.Control 
                                as="hidden" 
                                value={project[field.fieldName]}
                                onChange={(e) => handleContentChange(field.fieldName, e.target.value)}
                                isInvalid={ field.isRequired && !project[field.fieldName] && (blockedStep === field.step) }
                            />
                        )
                    }
                    <Form.Control.Feedback type='invalid'>
                        { t(`project.commercial.${field.fieldName}`) + " " + t(`project.message-not-allow-null`) }
                    </Form.Control.Feedback> */}
                </Form.Group>
            )
        })

        return renderedItems
    }

    return (
        <>
            <Stepper 
                project={project}
                renderText={renderText}
                renderTextArea={renderTextArea}
                renderEditor={renderEditor}
                renderCheckbox={renderCheckbox}
                renderCheckboxTreeView={renderCheckboxTreeView}
                renderInputImage={renderInputImage}
                projectFields={projectFields}
                projectType={projectType}
                handleContentChange={handleContentChange}
                handleSubmit={(e, isDraft) => handleSubmit(e, isDraft)}
                isLoading={isLoading}
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setBlockedStep={setBlockedStep}
                template={template}
                setTemplate={setTemplate}
                templateTypes={templateTypes}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        fields: state.fields.data,
        transmisstions: state.transmisstionMethods,
        levels: state.developmentLevels,
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(ProjectCreate);