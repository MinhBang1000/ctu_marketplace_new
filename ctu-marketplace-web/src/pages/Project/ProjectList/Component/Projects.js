/* eslint-disable jsx-a11y/img-redundant-alt */

import _ from 'lodash';
import Highlighter from "react-highlight-words";
import './Project.scss';

import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const TYPE_COMMERCIAL = 'commercial'
const TYPE_RESEARCHING = 'researching'
const TYPE_IDEA = 'idea'

const Projects = (props) => {

    var { projectType, projects, filteredFields, setFilteredFields, setIsFilterOneField } = props;
    

    const { t } = useTranslation('common');

    const onBtnFieldOfProjectClick = (field, e) => {
        e.preventDefault();

        if(filteredFields && filteredFields.length > 0){
            const index = filteredFields.findIndex(item => item.id.toString() === field.id.toString());
            if(index === -1){
                setFilteredFields(_.unionWith(filteredFields, [field], _.isEqual))
            }
        }

        
        else {
            setFilteredFields(_.unionWith(filteredFields, [field], _.isEqual))
        }
    }

    const renderLinhVuc = (projectFieldList) => {
        if (projectFieldList) {
            const renderedList = projectFieldList.map((field,index) => {
                let renderedItem = null;
                if (field.field.name.length > 20) {
                    var shortField = field.field.name.substring(0, 50) + "...";
                    renderedItem = renderHighlightOnSearch(shortField)
                }

                else renderedItem = renderHighlightOnSearch(field.field.name)

                return (
                    <button 
                        key={index} 
                        className={`rounded-3  p-1 text-white btn`} data-toggle="tooltip" 
                        title={field.field.name} 
                        onClick={e => onBtnFieldOfProjectClick(field.field, e)}
                    >
                        {renderedItem}
                    </button>
                )
            })

            return (
                <div className='d-flex gap-2'>
                    {renderedList}
                </div>
            )
        }

    };

    const renderTypeOfProject = (projectType) => {
        if (projectType === TYPE_COMMERCIAL) {
            return t('projects.commercial.title')
        }
        if (projectType === TYPE_RESEARCHING) {
            return t('projects.researching.title')
        }
        if (projectType === TYPE_IDEA) {
            return t('projects.idea.title')
        }
    }

    const filterProjects = (projects, query) => {
        console.log("query: ", query)
        if (!query) {
            return projects;
        }

        return projects.filter((project) => {
            const projectName = project.name.toLowerCase();
            const projectAuthor = project.author.toLowerCase();
            const projectFieldList = project.projectFieldList;
            let checkFieldEqualSearch = false;
            if (projectFieldList) {
                projectFieldList.map(field => {
                    if (field.field.name.toLowerCase().includes(query)) {
                        checkFieldEqualSearch = true;
                    }
                    return null;
                })
            }
            return projectName.includes(query) || projectAuthor.includes(query) || checkFieldEqualSearch;
        });
    };

    const renderHighlightOnSearch = (text) => {
        const query = new URLSearchParams(window.location.search).get('s');
        return (
            <Highlighter
                highlightClassName="bg-warning text-white rounded-3"
                searchWords={query ? [query] : []}
                autoEscape={true}
                textToHighlight={text}
            />
        )
    }

    const renderProjectShortDescription = (shortDescription, limit) => {
        if (shortDescription.length > limit) {
            return shortDescription.substring(0, limit) + '...'
        }
        else return shortDescription
    }

    const translateProjectTypeToVN = (projectTye) => {
        switch (projectTye) {
            case TYPE_COMMERCIAL:
                return 'thuong-mai';
            
            case TYPE_RESEARCHING:
                return 'nghien-cuu';

            case TYPE_IDEA:
                return 'y-tuong'

            default:
                break;
        }
    }

    const renderList = () => {
        const query = new URLSearchParams(window.location.search).get('s');

        if(projects && projects.length > 0){
            if (projects.filter(project => project?.status?.id === 101).length) {
                return _.orderBy(filterProjects(projects, query), ['number'], ['asc'])
                    .map((project, index) => {
                        const {
                            name,
                            author,
                            // projectImage,
                            // projectFieldList
    
                        } = project;
                        return (
                            <div className='mk-card-horizontal' key={index}>
                                    <div className="row product-card">
                                        <div className="col-lg-6 product-card__description" >
                                            <div className="mk-card-body">
                                                <div className='product-card__description__header'>
                                                    <ul className='mk-card-horizontal-field'>
                                                        {/* {renderLinhVuc(projectFieldList)} */}
                                                    </ul>
                                                </div>
                                                <Link
                                                    // to={`/san-pham/chi-tiet/${translateProjectTypeToVN(project.projectType)}/${project.id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <h4 className="fw-bold text-uppercase product-card__description__name">
                                                        {/* {renderHighlightOnSearch(name)} */} {name}
                                                    </h4>
                                                    <p className="card-text product-card__description__brief">
                                                        {/* {renderHighlightOnSearch(renderProjectShortDescription(project.shortDescription, 100))} */}
                                                    </p>
                                                    
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 product-card__related-info">
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    {/* {renderHighlightOnSearch(author)} */}
                                                </small>
                                            </p>
                                        </div>
                                        <div className="col-lg-3 product-card__image">
                                            {/* <img
                                                src={projectImage}
                                                className="img-fluid rounded-3"
                                                alt="Project Image"
                                                style={{
                                                    maxHeight: '16rem',
                                                    objectFit: 'contain',
                                                }}
                                            /> */}
                                        </div>
                                    </div>
                                {/* <hr /> */}
                            </div>
                        );
                    })
            }
            else return <div>{ t('projects.nodata') }</div>
        }
        return <div>{ t('projects.nodata') }</div>
    }

    const renderList7 = () => {
        console.log("render list 7: ", projects);
        return projects.map((project) => {
            // console.log("project in render list 7: ", project);
            return <p key={project.id}>{project.name}</p>
        })
    }

    const onSelectedFieldsOfProjectClick = (e,field) => {
        setIsFilterOneField(false);
        setFilteredFields(filteredFields.filter(item => item.id !== field.id))
    }

    const renderSelectedFieldsOfProject = () => {
        if(filteredFields && filteredFields.length > 0){
            let result = filteredFields.map(field => {
                return (
                    <button 
                        key={field.id}
                        className='btn btn-outline-info'
                        onClick={e => onSelectedFieldsOfProjectClick(e, field)}
                    >
                        { field.name }
                    </button>
                )
            })

            return (
                <div className='d-flex gap-2'>
                    { result }
                </div>
            )
        }
        
    }

    return (
        <>
            {/* <div className="home"> */}
                {/* <div className='home__search' id='home__search'>
                    <div className='home__search__input' id='home__search__input'>
                        <SearchBar />
                    </div>
                </div> */}
                {/* <h5>{ renderTypeOfProject(projectType) }</h5> */}
                {/* <div>
                    { renderSelectedFieldsOfProject() }
                </div> */}
                
                {/* <div className='home__project-list'> */}
                    {renderList()}
                {/* </div> */}
                {/* <div className='home__pagination'>
                    <Pagination count={10} onChange={changePage} />
                </div> */}
            {/* </div> */}
        </>
    );

};

export default Projects;