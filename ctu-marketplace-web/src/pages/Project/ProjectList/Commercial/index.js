/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { retrieveCommercialProjects } from "../../../../store/projectSlice";

import Projects from '../Component/Projects';
import axios from 'axios';
import {Link} from "react-router-dom"
import _ from 'lodash';
import { SEO_PROJECTS } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';
import { Pagination } from '@mui/material';
import './ProjectsList.scss'
import Highlighter from 'react-highlight-words';

const ProjectList = (props) => {
    const [projects7, setProjects7] = useState([]);
    const [projects, setProjects] = React.useState([]);
    const [filteredFields, setFilteredFields] = useState(props.location.state?.projectField ? [props.location.state.projectField] : null);
    const [isFilterOneField, setIsFilterOneField] = useState(props.location.state?.projectField ?? false);
    const [numberOfPage, setNumberOfPage] = React.useState(0);
    const [searchDisplay, setSearchDisplay] = useState(false)

    const dispatch = useDispatch();
    const projectFieldSelector = useSelector(state => state.filterProjectField);
    var itemPerPage = 4;

    const [search, setSearch] = useState('');


    useEffect(() => {
        seo({
            title: SEO_PROJECTS.commercial.title,
            metaDescription: SEO_PROJECTS.commercial.metaDescription
        });

        // dispatch(retrieveCommercialProjects())
        // .then(response => {
        //     setProjects(response.payload)
        // })

        axios.get('https://127.0.0.1:3999/api/v3/projects')
            .then(res => {
                // setProjects(res.data.data.slice(0, itemPerPage));
                setProjects(res.data.data.filter((project) => {
                    return project.template===false;
                }))
                setProjects7(res.data.data.filter((project) => {
                    return project.template===false;
                }).slice(0, itemPerPage));
                setNumberOfPage(Math.ceil(res.data.data.filter((project) => {
                    return project.template===false;
                }).length/itemPerPage));
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }, [])

    const changePage = (e, page) =>  {
        // currentPage = page;
        // setSearchQuery(page)
        // history.push(`?page=${page}`);
        // e.preventDefault();
        // currentPage = page;
        // setProjects(projects.slice(itemPerPage*(currentPage-1), itemPerPage*(currentPage-1)+itemPerPage));
        // projects7 = projects.slice(itemPerPage*(currentPage-1), itemPerPage*(currentPage-1)+itemPerPage);
        // console.log("projects7: ", projects7);

        // axios.get('https://marketplace.ctu.edu.vn/api/v2/public/projects')
        //     .then(res => {
        //         console.log("Project listttt: ", res);
        //         setProjects(res.data.data.slice(itemPerPage*(page-1), itemPerPage*(page-1)+itemPerPage));
        //         // console.log("response: ", res.data.data);
        //         // setNumberOfPage(Math.ceil(res.data.data.length/itemPerPage));
        //     })
        //     .catch(error => {
        //         console.log("Error: ", error);
        //     })

        setProjects7(projects.slice(itemPerPage*(page-1), itemPerPage*(page-1)+itemPerPage));

    }

    const searchProject = () => {
        // setSearch(e.target.value);
        axios.get(`https://127.0.0.1:3999/api/v3/projects?search=${search}`) // api tim kiem 
            .then(res => {
                console.log("res: ", res.data.data);
                setProjects(res.data.data.filter((project) => {
                    return project.template===false;
                }));
                setProjects7(res.data.data.filter((project) => {
                    return project.template===false;
                }).slice(0, itemPerPage));
                setNumberOfPage(Math.ceil(res.data.data.length/itemPerPage));
                setNumberOfPage(Math.ceil(res.data.data.filter((project) => {
                    return project.template===false;
                }).length/itemPerPage));
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

        window.onscroll = function () {
            // var homeLine = document.getElementById("home__line");
            if(document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
                setSearchDisplay(true)
                // homeLine?.style.setProperty('display', 'block');
            } else {
                // homeLine.style.display = 'none';
                setSearchDisplay(false)
            }
        }

    const renderBrief = (line) => {
        var lastDotIndex = line.lastIndexOf('.<');
        line=line.split('');
        if(lastDotIndex!==-1) {
            line[lastDotIndex] = '';    
        }
        var lineJoin = line.join('');
        if(lineJoin.length > 500) {
            lineJoin = lineJoin.substring(0, 500) + "...";
        }
        return lineJoin;
    }

    const renderHighlightOnSearch = (text) => {
        const query = search;
        return (
            <Highlighter
                highlightClassName="bg-warning text-white rounded-3"
                searchWords={query ? [query] : []}
                autoEscape={true}
                textToHighlight={text}
            />
        )
    }


    const renderList = () => {
        if(props.projects){
            // let filteredProjects = [];
            // if(filteredFields && filteredFields.length > 0){
            //     if(filteredFields[0].name === "Commercial-Projects" || filteredFields[0].name === "Researching-Projects" || filteredFields[0].name === "Idea-Projects"){
            //         setFilteredFields([]);
            //     }

            //     if(isFilterOneField && projectFieldSelector?.id?.toString() !== filteredFields[0]?.id?.toString()){
            //         setFilteredFields([projectFieldSelector])
            //     }
            //     projects.forEach(project => {
            //         project.projectFieldList.forEach(field => {
            //             if(filteredFields.some(checkedField => field.field?.id === checkedField.id)){
            //                 filteredProjects = _.unionWith(filteredProjects, [project], _.isEqual)
            //             }
            //         })
            //     });
            //

            // console.log("running");
            // console.log("current page: ", currentPage);
            // const query = new URLSearchParams(window.location.search).get('s');
            // console.log("query: ", query);

            // if(query!=='') {
            //     projects7 = projects.filter((project) => {
            //         return project.name.toLowerCase().includes(query);
            //     })
               
            // } else {
            //     projects7 = projects;
            // }

            // projects7.slice(itemPerPage*(currentPage-1), itemPerPage*(currentPage-1)+itemPerPage)
            // projects7 = projects;
            // projects7 = projects.splice(itemPerPage*(currentPage-1), itemPerPage*(currentPage-1)+itemPerPage);
            
            // quantityOfPage = Math.ceil(projects.length/itemPerPage);
            console.log("projects: ", projects); 

            return (
                <div className='home'>
                    <div className='home__line' id="home__line" style={{backgroundColor: 'var(--primary)', padding: '20px 0', position: 'sticky', zIndex: 9999, top: 70, display: searchDisplay? 'block' : 'none'}}>
                        <div className='home__search__block' style={{margin: 'auto'}}>
                            <div className='home__search__block__icon'>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                            </div>
                            <div className='home__search__block__input'>
                                <input type='text' value={search} onInput={(e) => setSearch(e.target.value)} placeholder='Nhập tên sản phẩm'/>
                            </div>
                            <div className='home__search__block__button' onClick={searchProject}>
                                {/* <a href='#projectsList'> */}
                                    Tìm kiếm
                                {/* </a> */}
                            </div>
                        </div>
                    </div>
                     
                    <div className='home__search' id='home__search' >
                        <div className='home__search__block' id='home__search__block'>
                                <div className='home__search__block__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                                </div>
                                <div className='home__search__block__input' id='projectsList'>
                                    <input type='text' value={search} onInput={(e) => setSearch(e.target.value)} placeholder='Nhập tên sản phẩm'/>
                                </div>
                                <div className='home__search__block__button' onClick={searchProject}>
                                    {/* <a href='#projectsList'> */}
                                        Tìm kiếm
                                    {/* </a> */}
                                </div>
                        </div>
                    </div>
                    <div className='home__project-list' id='projectsList'>
{/* Overhere */}
                        {
                            projects7.map((project, index) => <div className='mk-card-horizontal' key={index}>
                                <div className="row product-card">
                                    <div className="col-lg-6 product-card__description" >
                                        <div className="mk-card-body">
                                            <div className='product-card__description__header'>
                                                <ul className='mk-card-horizontal-field'>
                                                    {/* {renderLinhVuc(projectFieldList)} */}
                                                    {/* <li>Khoa học kỹ thuật và công nghệ</li>
                                                    <li>Chăn nuôi</li>
                                                    <li>Chế tạo máy công cụ</li>
                                                    <li>...</li> */}
                                                    {
                                                        project.fields.map((field) => {
                                                            return <li style={{color: 'rgba(0, 0, 0, 0.1) !important'}}>{field.name}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <Link
                                                to={`/projects/detail/${project.id}`}
                                                // to={`/san-pham/chi-tiet/${translateProjectTypeToVN(project.projectType)}/${project.id}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <h4 className="fw-bold text-uppercase product-card__description__name">
                                                    {/* {renderHighlightOnSearch(name)} {project.name} */}
                                                    {renderHighlightOnSearch(project.name)}
                                                </h4>
                                                <div className="card-text product-card__description__brief">
                                                    
                                                    {/* {renderHighlightOnSearch(renderProjectShortDescription(project.shortDescription, 100))} */}
                                                    {/* {project.keyValues[0].value.innerText} */}
                                                    {/* project.keyValues[0].value.substring(0, project.keyValues[0].value.length-2).substring(0, 800) */}
                                                    <span dangerouslySetInnerHTML={{ __html: renderBrief(project.keyValues[0].value)}}></span>
                                                    
                                                </div>
                                                
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 product-card__related-info">
                                        {/* <p className="card-text">
                                            <small className="text-muted">
                                                {renderHighlightOnSearch(author)}
                                            </small>
                                        </p> */}
                                        <table>
                                            <tr>
                                                <td className='name' style={{width: '65px', verticalAlign: 'top', display: 'table-cell'}}>Tác giả:</td>
                                                <td className='value'>{project.author.substring(0, 200)} {project.author.length > 200 ? '...' : ''}</td>
                                            </tr>
                                        </table>
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
                                        <img src={`https://127.0.0.1:3999/api/v3/projects/view-image/${project.image}`} />
                                    </div>
                                </div>
                            </div>)
                        }

{/* Overhere */}
                        {/* <Projects 
                            projects={projects} // filteredFields && filteredFields.length > 0 ? filteredProjects : projects
                            projectType='commercial' 
                            filteredFields={filteredFields} 
                            setFilteredFields={setFilteredFields}
                            setIsFilterOneField={setIsFilterOneField}
                        /> */}
                    </div>
                    <div className='home__pagination' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                        <Pagination count={numberOfPage} onChange={changePage} />
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <>
            { renderList() }
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        projects:  Object.values(state.projects.data),
        // isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps, 
    {}
)(ProjectList);