/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import { retrieveCommercialProjects } from "../../../../store/projectSlice";

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
    // const [filteredFields, setFilteredFields] = useState(props.location.state?.projectField ? [props.location.state.projectField] : null);
    // const [isFilterOneField, setIsFilterOneField] = useState(props.location.state?.projectField ?? false);
    const [numberOfPage, setNumberOfPage] = React.useState(0);
    const [searchDisplay, setSearchDisplay] = useState(false)

    // const dispatch = useDispatch();
    // const projectFieldSelector = useSelector(state => state.filterProjectField);
    var itemPerPage = 2;
    const [showFilter, setShowFilter] = useState(false)

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

        axios.get(`https://marketplace.ctu.edu.vn/api/v3/projects`)
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
        setProjects7(projects.slice(itemPerPage*(page-1), itemPerPage*(page-1)+itemPerPage));
    }

    const searchProject = () => {
        axios.get(`https://marketplace.ctu.edu.vn/api/v3/projects?search=${search}`) // api tim kiem 
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
            setShowFilter(false)
            if(document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
                setSearchDisplay(true)
            } else {
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

    const handleFilter = () => {
        console.log("on blur");
        setShowFilter(true);
    }

    const hideFilter = () => {
        setShowFilter(false);
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
                                    Tìm kiếm
                            </div>
                        </div>
                    </div>
                     
                    <div className='home__search' id='home__search' >
                    {/* style={{height: showFilter? '500px' : '70px'}} */}
                    {/* className='home__search__block' */}
                        <div id='home__search__block' className='home__search__block'> 
                            <div className='home__search__block__search'>
                                <div className='home__search__block__search__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>
                                </div>
                                <div className='home__search__block__search__input' id='projectsList'>
                                    <input type='text' value={search} onInput={(e) => setSearch(e.target.value)} placeholder='Nhập tên sản phẩm'/>
                                </div>
                                <div className='home__search__block__search__filter' onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                                    {/* <img src={require('../../../../assets/images/filter.png')}  alt='filter' width={50}/> */}
                                    <svg  onMouseOver={handleFilter} id="Group_35" data-name="Group 35" xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 66.58 57.184">
                                        <path id="Path_16" data-name="Path 16" d="M-170.816-274.868q7.167,0,14.334,0c1.011,0,2.023.02,3.032-.024.527-.023,1.044.071,1.571.034.56-.04,1.125-.009,1.688-.009h5.025c.667,0,.647-.008.877-.624a8.861,8.861,0,0,1,7.527-6.133,9,9,0,0,1,9.806,6.368.461.461,0,0,0,.519.393c1.524-.011,3.048.006,4.572-.011.387,0,.536.109.529.512q-.031,1.771,0,3.542c.007.409-.151.512-.532.508-1.455-.016-2.911.009-4.366-.014a.683.683,0,0,0-.79.553,9.08,9.08,0,0,1-8.732,6.294,9.07,9.07,0,0,1-8.531-6.292.687.687,0,0,0-.785-.557q-20.966.016-41.932.009a3.9,3.9,0,0,0-.412,0c-.349.037-.48-.083-.473-.459.024-1.235.019-2.471,0-3.707,0-.309.076-.394.39-.393Q-179.158-274.861-170.816-274.868Zm39.725,2.284a4.573,4.573,0,0,0-4.529-4.585,4.615,4.615,0,0,0-4.608,4.551,4.578,4.578,0,0,0,4.533,4.589A4.563,4.563,0,0,0-131.091-272.583Z" transform="translate(187.916 301.197)"/>
                                        <path id="Path_17" data-name="Path 17" d="M-136.028-34.24c-4.64,0-9.281.006-13.921-.008a.636.636,0,0,0-.723.517,8.825,8.825,0,0,1-6.667,6.088,8.747,8.747,0,0,1-8.4-2.412,8.587,8.587,0,0,1-2.277-3.753.533.533,0,0,0-.615-.437q-6.013.013-12.026.005c-2.292,0-4.585-.007-6.877.006-.363,0-.5-.083-.494-.48.023-1.235.014-2.471-.012-3.706-.008-.364.192-.366.44-.366h9.761c3.031,0,6.062-.006,9.093.009a.67.67,0,0,0,.764-.53,8.843,8.843,0,0,1,7.366-6.208,8.7,8.7,0,0,1,7.288,2.177,8.784,8.784,0,0,1,2.684,4.156c.113.367.343.4.653.4q3.913-.007,7.825,0h19.852c.927,0,.831-.042.832.812q0,1.524,0,3.048c0,.686,0,.686-.667.686Zm-23.343,2.291a4.58,4.58,0,0,0,4.619-4.534,4.613,4.613,0,0,0-4.525-4.6,4.589,4.589,0,0,0-4.635,4.484A4.57,4.57,0,0,0-159.371-31.949Z" transform="translate(188.054 84.575)"/>
                                        <path id="Path_18" data-name="Path 18" d="M-141.742-506.927h-17.875c-.59,0-1.181.019-1.77-.006a.515.515,0,0,0-.583.439,9.022,9.022,0,0,1-3.236,4.6,8.926,8.926,0,0,1-4.538,1.782,8.741,8.741,0,0,1-4.73-.795,8.915,8.915,0,0,1-4.838-5.485.667.667,0,0,0-.777-.548c-2.553.019-5.107,0-7.661.02-.388,0-.442-.117-.438-.462q.022-1.914-.021-3.829c-.007-.31.17-.219.313-.219,2.595,0,5.19-.011,7.784.013a.706.706,0,0,0,.808-.573,8.9,8.9,0,0,1,7.664-6.237,8.479,8.479,0,0,1,5.544,1.167,8.936,8.936,0,0,1,4.078,5.07.716.716,0,0,0,.825.572q19.358-.018,38.716-.009a3.175,3.175,0,0,0,.37,0c.362-.042.48.113.475.471q-.024,1.812,0,3.624c0,.328-.1.414-.426.413q-6.692-.017-13.384-.009Zm-24.341-2.226a4.636,4.636,0,0,0-4.61-4.613,4.584,4.584,0,0,0-4.522,4.6,4.559,4.559,0,0,0,4.57,4.583A4.62,4.62,0,0,0-166.083-509.153Z" transform="translate(188.209 518.3)"/>
                                    </svg>
                                    <span>Lọc</span>
                                </div>
                                <div className='home__search__block__search__button' onClick={searchProject}>
                                        Tìm kiếm
                                </div>
                            </div>
                            <div class="none"  onMouseOver={handleFilter} onMouseLeave={hideFilter}></div>
                            <div className={showFilter? 'home__search__block__filter home__search__block__filter--active' : 'home__search__block__filter'}   onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                                <div className={showFilter? 'home__search__block__filter__virtual home__search__block__filter__virtual--active' : 'home__search__block__filter__virtual'}>
                                    <div className='home__search__block__filter__title'>
                                        Lọc theo lĩnh vực
                                    </div>
                                    <div className='home__search__block__filter__list'>
                                        <div className='home__search__block__filter__list__item'>
                                            <input type='checkbox' id=''/>
                                            <label for=''>Khoa học công nghệ</label>
                                        </div>
                                    </div>
                                    <div className='home__search__block__filter__button'>
                                        Lọc
                                    </div>
                                </div>
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
                                                    {
                                                        project.fields.slice(0,2).map((field) => {
                                                            return <li style={{color: 'rgba(0, 0, 0, 0.2) !important'}}>{field.name}</li>
                                                        })
                                                    }
                                                    {
                                                        project.fields.length > 2 ? <li>...</li> : ''
                                                    }
                                                </ul>
                                            </div>
                                            <Link
                                                to={`/projects/detail/${project.id}`}
                                                // to={`/san-pham/chi-tiet/${translateProjectTypeToVN(project.projectType)}/${project.id}`}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <h4 className="fw-bold text-uppercase product-card__description__name">
                                                    {renderHighlightOnSearch(project.name)}
                                                </h4>
                                                <div className="card-text product-card__description__brief">
                                                    <span dangerouslySetInnerHTML={{ __html: renderBrief(project.keyValues[0].value)}}></span>
                                                </div>
                                                
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 product-card__related-info"> 
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
                                        <img src={`https://marketplace.ctu.edu.vn/api/v3/projects/view-image/${project.image}`} />
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