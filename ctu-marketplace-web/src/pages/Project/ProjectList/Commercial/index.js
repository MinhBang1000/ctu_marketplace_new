/* eslint-disable no-restricted-globals */

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import axios from 'axios';
import {Link} from "react-router-dom"
import _, { filter } from 'lodash';
import { SEO_PROJECTS } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';
import { Pagination } from '@mui/material';
import './ProjectsList.scss'
import Highlighter from 'react-highlight-words';

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, A11y } from 'swiper';

//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProjectList = (props) => {
    const [projects7, setProjects7] = useState([]);
    const [projects, setProjects] = React.useState([]);
   
    const [numberOfPage, setNumberOfPage] = React.useState(0);
    const [searchDisplay, setSearchDisplay] = useState(false)

    var itemPerPage = 10;
    const [showFilter, setShowFilter] = useState(false);
    const [fields, setFields] = useState([]); 
    const [fieldFilter, setFieldFilter] = useState([]);

    const [search, setSearch] = useState('');
    const [currentPgae, setCurrentPage] = useState(1);

    const [swiper, setSwiper] = React.useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperProjects, setSwiperProjects] = useState([]);

    const [heightNavbarSearch, setHeightNavbarSearch] = useState('');

    const apiGetProjects = "https://marketplace.ctu.edu.vn/api/v3/projects"; //127.0.0.1:3999

    const [itemPerSlide, setItemPerSlide] = useState(4);
    const nexto = () => {
        swiper.slideNext();
        setActiveIndex(swiper.activeIndex);
    };
    const prev = () => {
        swiper.slidePrev();
        setActiveIndex(swiper.activeIndex);
    }
    
    const history = useHistory();

    useEffect(() => {
        seo({
            title: SEO_PROJECTS.commercial.title,
            metaDescription: SEO_PROJECTS.commercial.metaDescription
        }); 

        const queryParameters = new URLSearchParams(window.location.search)
        const fieldId = Number(queryParameters.get("field"));

        axios.get(`${apiGetProjects}?search=${search}`)
            .then(res => {
                return res.data.data.filter((project) => {
                    return project.template===false && project.status?.code === 'DD'
                })
            })
            .then(res => {
                if(fieldId!==null && fieldId!==0) {
                    setSwiperProjects(res.slice(0, 8));
                    var projectsTemp = [];
                    projectsTemp = res.filter((project) => {
                        var fields = [];
                        for(var i=0; i<project.fields.length; i++) {
                            fields.push(project.fields[i].id)
                        }
                        var check = false;
                        if(fields.includes(fieldId)) {
                            check=true;
                        }
                        return check;
                    })
                    setProjects(projectsTemp);
                    setProjects7(projectsTemp.slice(0, itemPerPage));
                    setNumberOfPage(Math.ceil(projectsTemp.length/itemPerPage));
                    setCurrentPage(1);
                    window.scrollBy(0, 900 - document.documentElement.scrollTop - 130);
                } else { 
                    setProjects(res)
                    setProjects7(res.slice(0, itemPerPage));
                    setSwiperProjects(res.slice(0, 8));
                    setNumberOfPage(Math.ceil(res.length/itemPerPage));
                }
            })
            .catch(error => {
                console.log("Error: ", error);
            })

        axios.get('https://marketplace.ctu.edu.vn/api/v3/fields')
            .then(res => {
                return res.data.data.map(field => {
                    var newField = {};
                    newField.id = field.id;
                    newField.name = field.name;
                    newField.status = false;
                    return newField;
                });
            })
            .then(res => {
                if(fieldId!==null && fieldId!==0) {
                    for(var i=0 ; i<res.length; i++) {
                        if(res[i].id === fieldId) {
                            res[i].status = true;
                        }
                    }
                    var newFields = [fieldId];
                    setFieldFilter(newFields);
                }
                return res;
            })
            .then(res=> {
                setFields(res);
            })

        //responsive
        setHeightNavbarSearch(document.getElementById('home__line')?.offsetHeight || 0);
        var screenWidth = screen.width;
        if(screenWidth <= 576) {
            setItemPerSlide(1);
        } else if(screenWidth <= 768) {
            setItemPerSlide(2);
        } else if(screenWidth <= 992) {
            setItemPerSlide(3);
        } else {
            setItemPerSlide(4);
        }
        
    }, [])

    //responsive
    onresize = (event) => {
        setHeightNavbarSearch(document.getElementById('home__line')?.offsetHeight || 0);
        var width = screen.width;
        if(width <= 576) {
            setItemPerSlide(1);
        } else if(width <= 768) {
            setItemPerSlide(2);
        } else if(width <= 992) {
            setItemPerSlide(3);
        } else {
            setItemPerSlide(4);
        }
    }

    const changePage = (e, page) =>  {
        setCurrentPage(page)
        setProjects7(projects.slice(itemPerPage*(page-1), itemPerPage*(page-1)+itemPerPage));
        document.getElementById('home__project-list')?.scrollIntoView({ behavior: 'smooth' });
    }

    const searchProject = (e) => {
        e.preventDefault();
        axios.get(`${apiGetProjects}?search=${search}`)
            .then(res => {
                return res.data.data.filter((project) => {
                    return project.template===false && project.status?.code === 'DD';
                });
            })
            .then(res => {
                setProjects(res);
                setProjects7(res.slice(0, itemPerPage));
                setNumberOfPage(Math.ceil(res.length/itemPerPage));
                if(projects.length > 0 && search !== '') {
                    window.scrollBy(0, 900 - document.documentElement.scrollTop - heightNavbarSearch);
                }
                setFields(fields.map(field => {
                        var nField = field;
                        nField.status = false;
                        return nField;
                }))
                setCurrentPage(1);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

    window.onscroll = function () {
        setShowFilter(false)
        if(document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
            setSearchDisplay(true);
        } else {
            setSearchDisplay(false)
        }
    }

    const renderBrief = (line) => {
        if(line !== undefined) {
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
        return '';
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
        setShowFilter(true);
    }

    const hideFilter = () => {
        setShowFilter(false);
    }

    const removeFilter = () => {
        history.push({});
        if(fieldFilter.length > 0) {
            axios.get(`${apiGetProjects}?search=${search}`)
                .then(res => {
                    return res.data.data.filter((project) => {
                        return project.template===false && project.status?.code === 'DD';
                    })
                })
                .then(res => {
                    setProjects(res);
                    setProjects7(res.slice(0, itemPerPage));
                    setNumberOfPage(Math.ceil(res.length/itemPerPage));
                    setFields(fields.map(field => {
                        var nField = field;
                        nField.status = false;
                        return nField;
                    }))
                    setCurrentPage(1);
                    window.scrollBy(0, 900 - document.documentElement.scrollTop - heightNavbarSearch);
                })
                .catch(error => {
                    console.log("Error: ", error);
                })
        }
    }

    const handleUpdateCheckboxList = (id) => {  //tim ra mang check    
        fields.map(field => {
            return field.id === id ? field.status = ! field.status : '';
        })
        setFields([...fields]);
        var newFields = [];
        for(var i=0; i<fields.length; i++) {
            if(fields[i].status === true) {
                newFields.push(fields[i].id);
            }
        }
        setFieldFilter(newFields);
    }

    const handleClickFilter = () => {   
        history.push({});
        axios.get(`${apiGetProjects}?search=${search}`)
            .then(res => {
                return res.data.data.filter((project) => {
                    return project.template===false && project.status?.code === 'DD';
                })
            })
            .then(res => {
                if(fieldFilter.length > 0) {
                    var projectsTemp = [];
                    projectsTemp = res.filter((project) => {
                        var fields = [];
                        for(var i=0; i<project.fields.length; i++) {
                            fields.push(project.fields[i].id)
                        }
                        var check = false;
                        for(i=0; i<fieldFilter.length; i++) {
                            if(fields.includes(fieldFilter[i])) {
                                check=true;
                                break;
                            }
                        }
                        return check;
                    });
                    setProjects(projectsTemp);
                    setProjects7(projectsTemp.slice(0, itemPerPage));
                    setNumberOfPage(Math.ceil(projectsTemp.length/itemPerPage));
                    setCurrentPage(1);
                    window.scrollBy(0, 900 - document.documentElement.scrollTop - heightNavbarSearch);
                } else {
                    setProjects(res);
                    setProjects7(res.slice(0, itemPerPage));
                    setNumberOfPage(Math.ceil(res.length/itemPerPage));
                    setCurrentPage(1);
                }
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleClickFilterInProjectCard = (id) => {
        axios.get(`${apiGetProjects}?search=${search}`)
            .then(res => {
                return res.data.data.filter((project) => {
                    return project.template===false && project.status?.code === 'DD';
                })
            })
            .then(res => {
                setProjects(res);
                var projectsTemp = [];
                projectsTemp = res.filter((project) => {
                    var fields = [];
                    for(var i=0; i<project.fields.length; i++) {
                        fields.push(project.fields[i].id)
                    }
                    var check = false;
                    if(fields.includes(id)) {
                        check=true;
                    }
                    return check;
                
                })
                setProjects(projectsTemp);
                setProjects7(projectsTemp.slice(0, itemPerPage));
                setNumberOfPage(Math.ceil(projectsTemp.length/itemPerPage));
                setCurrentPage(1);
                fields.map(field => {
                    return field.id === id ? field.status = true : '';
                })
                setFields([...fields]);
                var newFields = [];
                for(var i=0; i<fields.length; i++) {
                    if(fields[i].status === true) {
                        newFields.push(fields[i].id);
                    }
                }
                setFieldFilter(newFields);
                window.scrollBy(0, 900 - document.documentElement.scrollTop - heightNavbarSearch);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }
 
    const renderList = () => {
        if(props.projects){
            return (
                <div className='home'>
                    <div className={searchDisplay? 'home_line home__line--active' : 'home__line'} id="home__line" style={{backgroundColor: 'var(--primary)', padding: '20px 0', position: 'sticky', zIndex: 4, top: 70}}>
                    <div id='home__search__block' className='home__search__block' style={{margin: 'auto'}}> 
                        <form className='home__search__block__search row' onSubmit={(e) => searchProject(e)}>
                            <div className='col-md-10 col-sm-12 group-icon-input'>
                                <div className='home__search__block__search__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px">
                                        <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/>
                                    </svg>
                                </div>
                                <div className='home__search__block__search__input' id='projectsList'>
                                    <input type='text' value={search} onInput={(e) => setSearch(e.target.value)} placeholder='Nhập tên sản phẩm, từ khóa...'/>
                                </div>
                                <div className='home__search__block__search__filter' onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                                    {/* <img src={require('../../../../assets/images/filter.png')}  alt='filter' width={50}/> */}
                                    <svg  onMouseOver={handleFilter} id="Group_35" data-name="Group 35" xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 66.58 57.184">
                                        <path id="Path_16" data-name="Path 16" d="M-170.816-274.868q7.167,0,14.334,0c1.011,0,2.023.02,3.032-.024.527-.023,1.044.071,1.571.034.56-.04,1.125-.009,1.688-.009h5.025c.667,0,.647-.008.877-.624a8.861,8.861,0,0,1,7.527-6.133,9,9,0,0,1,9.806,6.368.461.461,0,0,0,.519.393c1.524-.011,3.048.006,4.572-.011.387,0,.536.109.529.512q-.031,1.771,0,3.542c.007.409-.151.512-.532.508-1.455-.016-2.911.009-4.366-.014a.683.683,0,0,0-.79.553,9.08,9.08,0,0,1-8.732,6.294,9.07,9.07,0,0,1-8.531-6.292.687.687,0,0,0-.785-.557q-20.966.016-41.932.009a3.9,3.9,0,0,0-.412,0c-.349.037-.48-.083-.473-.459.024-1.235.019-2.471,0-3.707,0-.309.076-.394.39-.393Q-179.158-274.861-170.816-274.868Zm39.725,2.284a4.573,4.573,0,0,0-4.529-4.585,4.615,4.615,0,0,0-4.608,4.551,4.578,4.578,0,0,0,4.533,4.589A4.563,4.563,0,0,0-131.091-272.583Z" transform="translate(187.916 301.197)"/>
                                        <path id="Path_17" data-name="Path 17" d="M-136.028-34.24c-4.64,0-9.281.006-13.921-.008a.636.636,0,0,0-.723.517,8.825,8.825,0,0,1-6.667,6.088,8.747,8.747,0,0,1-8.4-2.412,8.587,8.587,0,0,1-2.277-3.753.533.533,0,0,0-.615-.437q-6.013.013-12.026.005c-2.292,0-4.585-.007-6.877.006-.363,0-.5-.083-.494-.48.023-1.235.014-2.471-.012-3.706-.008-.364.192-.366.44-.366h9.761c3.031,0,6.062-.006,9.093.009a.67.67,0,0,0,.764-.53,8.843,8.843,0,0,1,7.366-6.208,8.7,8.7,0,0,1,7.288,2.177,8.784,8.784,0,0,1,2.684,4.156c.113.367.343.4.653.4q3.913-.007,7.825,0h19.852c.927,0,.831-.042.832.812q0,1.524,0,3.048c0,.686,0,.686-.667.686Zm-23.343,2.291a4.58,4.58,0,0,0,4.619-4.534,4.613,4.613,0,0,0-4.525-4.6,4.589,4.589,0,0,0-4.635,4.484A4.57,4.57,0,0,0-159.371-31.949Z" transform="translate(188.054 84.575)"/>
                                        <path id="Path_18" data-name="Path 18" d="M-141.742-506.927h-17.875c-.59,0-1.181.019-1.77-.006a.515.515,0,0,0-.583.439,9.022,9.022,0,0,1-3.236,4.6,8.926,8.926,0,0,1-4.538,1.782,8.741,8.741,0,0,1-4.73-.795,8.915,8.915,0,0,1-4.838-5.485.667.667,0,0,0-.777-.548c-2.553.019-5.107,0-7.661.02-.388,0-.442-.117-.438-.462q.022-1.914-.021-3.829c-.007-.31.17-.219.313-.219,2.595,0,5.19-.011,7.784.013a.706.706,0,0,0,.808-.573,8.9,8.9,0,0,1,7.664-6.237,8.479,8.479,0,0,1,5.544,1.167,8.936,8.936,0,0,1,4.078,5.07.716.716,0,0,0,.825.572q19.358-.018,38.716-.009a3.175,3.175,0,0,0,.37,0c.362-.042.48.113.475.471q-.024,1.812,0,3.624c0,.328-.1.414-.426.413q-6.692-.017-13.384-.009Zm-24.341-2.226a4.636,4.636,0,0,0-4.61-4.613,4.584,4.584,0,0,0-4.522,4.6,4.559,4.559,0,0,0,4.57,4.583A4.62,4.62,0,0,0-166.083-509.153Z" transform="translate(188.209 518.3)"/>
                                    </svg>
                                    <span>Chọn lĩnh vực</span>
                                </div>
                            </div>
                            <button type='submit' className='home__search__block__search__button col-md-2' >
                                    Tìm kiếm
                            </button>
                        </form>
                        <div className="none"  onMouseOver={handleFilter} onMouseLeave={hideFilter}></div>
                        <div className={showFilter && searchDisplay? 'home__search__block__filter home__search__block__filter--active' : 'home__search__block__filter'}   onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                            <div className={showFilter && searchDisplay? 'home__search__block__filter__virtual home__search__block__filter__virtual--active' : 'home__search__block__filter__virtual'}>
                                <div className='home__search__block__filter__title'>
                                    Lọc theo lĩnh vực
                                </div>
                                <div className='home__search__block__filter__list'>
                                    {
                                        fields.map((field) => <div key={field.id + '2'} className='home__search__block__filter__list__item'>
                                                <input type='checkbox' id={field.id + '2'} checked={field.status} onChange={(e) => handleUpdateCheckboxList(field.id)}/>
                                                <label htmlFor={field.id + '2'} >{field.name}</label>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='home__search__block__filter__button'>
                                    <div className='home__search__block__filter__button__remove' onClick={(e) => removeFilter()}>Bỏ lọc</div>
                                    <div className='home__search__block__filter__button__filter'  onClick={(e) => handleClickFilter()}>Lọc theo lĩnh vực</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>                     
                    <div className='home__search' style={{marginTop: searchDisplay? `${heightNavbarSearch*(-1)}px` : '0'}} id='home__search' >
                        <div className='home__search__header'>
                            <div className='home__search__header__unit'>
                                Trường Đại học Cần Thơ
                            </div>
                            <div className='home__search__header__name-web'>
                                    CÔNG NGHỆ <font color='#ffaf00'>&</font> <br/>SẢN PHẨM CÔNG NGHỆ SÁNG TẠO
                            </div>
                        </div>
                        <div id='home__search__block' className='home__search__block'> 
                            <form className='home__search__block__search row' onSubmit={(e) => searchProject(e)}>
                                <div className='col-md-10 col-sm-12 group-icon-input'>
                                    <div className='home__search__block__search__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px">
                                            <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/>
                                        </svg>
                                    </div>
                                    <div className='home__search__block__search__input' id='projectsList'>
                                        <input type='text' value={search} onInput={(e) => setSearch(e.target.value)} placeholder='Nhập tên sản phẩm, từ khóa...'/>
                                    </div>
                                    <div className='home__search__block__search__filter' onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                                        {/* <img src={require('../../../../assets/images/filter.png')}  alt='filter' width={50}/> */}
                                        <svg  onMouseOver={handleFilter} id="Group_35" data-name="Group 35" xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 66.58 57.184">
                                            <path id="Path_16" data-name="Path 16" d="M-170.816-274.868q7.167,0,14.334,0c1.011,0,2.023.02,3.032-.024.527-.023,1.044.071,1.571.034.56-.04,1.125-.009,1.688-.009h5.025c.667,0,.647-.008.877-.624a8.861,8.861,0,0,1,7.527-6.133,9,9,0,0,1,9.806,6.368.461.461,0,0,0,.519.393c1.524-.011,3.048.006,4.572-.011.387,0,.536.109.529.512q-.031,1.771,0,3.542c.007.409-.151.512-.532.508-1.455-.016-2.911.009-4.366-.014a.683.683,0,0,0-.79.553,9.08,9.08,0,0,1-8.732,6.294,9.07,9.07,0,0,1-8.531-6.292.687.687,0,0,0-.785-.557q-20.966.016-41.932.009a3.9,3.9,0,0,0-.412,0c-.349.037-.48-.083-.473-.459.024-1.235.019-2.471,0-3.707,0-.309.076-.394.39-.393Q-179.158-274.861-170.816-274.868Zm39.725,2.284a4.573,4.573,0,0,0-4.529-4.585,4.615,4.615,0,0,0-4.608,4.551,4.578,4.578,0,0,0,4.533,4.589A4.563,4.563,0,0,0-131.091-272.583Z" transform="translate(187.916 301.197)"/>
                                            <path id="Path_17" data-name="Path 17" d="M-136.028-34.24c-4.64,0-9.281.006-13.921-.008a.636.636,0,0,0-.723.517,8.825,8.825,0,0,1-6.667,6.088,8.747,8.747,0,0,1-8.4-2.412,8.587,8.587,0,0,1-2.277-3.753.533.533,0,0,0-.615-.437q-6.013.013-12.026.005c-2.292,0-4.585-.007-6.877.006-.363,0-.5-.083-.494-.48.023-1.235.014-2.471-.012-3.706-.008-.364.192-.366.44-.366h9.761c3.031,0,6.062-.006,9.093.009a.67.67,0,0,0,.764-.53,8.843,8.843,0,0,1,7.366-6.208,8.7,8.7,0,0,1,7.288,2.177,8.784,8.784,0,0,1,2.684,4.156c.113.367.343.4.653.4q3.913-.007,7.825,0h19.852c.927,0,.831-.042.832.812q0,1.524,0,3.048c0,.686,0,.686-.667.686Zm-23.343,2.291a4.58,4.58,0,0,0,4.619-4.534,4.613,4.613,0,0,0-4.525-4.6,4.589,4.589,0,0,0-4.635,4.484A4.57,4.57,0,0,0-159.371-31.949Z" transform="translate(188.054 84.575)"/>
                                            <path id="Path_18" data-name="Path 18" d="M-141.742-506.927h-17.875c-.59,0-1.181.019-1.77-.006a.515.515,0,0,0-.583.439,9.022,9.022,0,0,1-3.236,4.6,8.926,8.926,0,0,1-4.538,1.782,8.741,8.741,0,0,1-4.73-.795,8.915,8.915,0,0,1-4.838-5.485.667.667,0,0,0-.777-.548c-2.553.019-5.107,0-7.661.02-.388,0-.442-.117-.438-.462q.022-1.914-.021-3.829c-.007-.31.17-.219.313-.219,2.595,0,5.19-.011,7.784.013a.706.706,0,0,0,.808-.573,8.9,8.9,0,0,1,7.664-6.237,8.479,8.479,0,0,1,5.544,1.167,8.936,8.936,0,0,1,4.078,5.07.716.716,0,0,0,.825.572q19.358-.018,38.716-.009a3.175,3.175,0,0,0,.37,0c.362-.042.48.113.475.471q-.024,1.812,0,3.624c0,.328-.1.414-.426.413q-6.692-.017-13.384-.009Zm-24.341-2.226a4.636,4.636,0,0,0-4.61-4.613,4.584,4.584,0,0,0-4.522,4.6,4.559,4.559,0,0,0,4.57,4.583A4.62,4.62,0,0,0-166.083-509.153Z" transform="translate(188.209 518.3)"/>
                                        </svg>
                                        <span>Chọn lĩnh vực</span>
                                    </div>
                                </div>
                                <button type='submit' className='home__search__block__search__button col-md-2'>
                                        Tìm kiếm
                                </button>
                            </form>
                            <div className="none"  onMouseOver={handleFilter} onMouseLeave={hideFilter}></div>
                            <div className={showFilter? 'home__search__block__filter home__search__block__filter--active' : 'home__search__block__filter'}  onMouseOver={handleFilter} onMouseLeave={hideFilter}>
                                <div className={showFilter? 'home__search__block__filter__virtual home__search__block__filter__virtual--active' : 'home__search__block__filter__virtual'}>
                                    <div className='home__search__block__filter__title'>
                                        Lọc theo lĩnh vực
                                    </div>
                                    <div className='home__search__block__filter__list'>
                                        {
                                            fields.map((field, index) => <div className='home__search__block__filter__list__item'>
                                                    <input type='checkbox'  key={index} id={field.id + '1'} checked={field.status} onChange={(e) => handleUpdateCheckboxList(field.id)}/>
                                                    <label htmlFor={field.id + '1'} >{field.name}</label>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='home__search__block__filter__button'>
                                        <div className='home__search__block__filter__button__remove' onClick={(e) => removeFilter()}>Bỏ lọc</div>
                                        <div className='home__search__block__filter__button__filter'  onClick={(e) => handleClickFilter()}>Lọc theo lĩnh vực</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {swiperProjects.length > 0 && 
                            <div className='home__search__image'>
                                <div className='home__search__image__button home__search__image__button--prev' style={{opacity: activeIndex===0? 0.5 : 1, cursor: activeIndex===0? 'auto' : 'pointer'}} onClick={prev}>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" >
                                        <g><path strokeWidth="10" d="M732.1,989.9c6.6,0,13.2-2.5,18.3-7.5c10.1-10.1,10.1-26.4,0-36.5l-446-446l446-446c10.1-10.1,10.1-26.4,0-36.5c-10.1-10.1-26.4-10.1-36.5,0L249.7,481.8c-10.1,10.1-10.1,26.4,0,36.5l464.2,464.2C718.9,987.5,725.5,990,732.1,989.9L732.1,989.9z"/></g>
                                    </svg>
                                </div>
                                <Swiper
                                    modules={[Navigation, Scrollbar, A11y]}
                                    spaceBetween={30}
                                    slidesPerView={itemPerSlide}
                                    onSwiper={(s) => {
                                        setSwiper(s);
                                    }}
                                    onSlideChange={() => ''}
                                >
                                    {
                                        swiperProjects.map((project, index) => <SwiperSlide key={project.id + 'project1'}>
                                             <Link 
                                                to={`/projects/detail/${project.id}`}
                                            >
                                                <div className='home__search__image__item'>
                                                    <div className='home__search__image__item__name'>
                                                        {project.name}
                                                    </div>
                                                    <img src={`${apiGetProjects}/view-image/${project.image}`}  alt='filter' width={50}/>
                                                </div>
                                            </Link>
                                        </SwiperSlide>)
                                    }
                                </Swiper>                                
                                <div className='home__search__image__button home__search__image__button--next' id='home__project-list' style={{opacity: activeIndex===swiperProjects.length-itemPerSlide? 0.5 : 1, cursor: activeIndex===4? 'auto' : 'pointer'}} onClick={nexto}>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                                        <g><path d="M675.7,503.7l-426,425.9c-14.2,14.2-14.2,35.5,0,49.7s35.5,14.2,49.7,0l447.3-447.5c7.1-7.1,14.2-21.3,14.2-28.4s0-21.3-7.1-28.4L299.5,20.7c-14.2-14.2-35.5-14.2-49.7,0c-14.2,14.2-14.2,35.5,0,49.7L675.7,503.7L675.7,503.7z"/></g>
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>

                    <div>
                        {projects7.length > 0 ? 
                        <>
                            <div className='home__project-list'>
                                {projects7.map((project, index) => <div className='mk-card-horizontal' key={project.id + 'project2'}>
                                        <div className="row product-card row">
                                            <div className="col-lg-6 col-md-12 product-card__description">
                                                <div className="mk-card-body">
                                                    <div className='product-card__description__header'>
                                                        <ul className='mk-card-horizontal-field'>
                                                            {
                                                                project.fields.slice(0,2).map((field, indexField) => {
                                                                    return <li key={field.id + index + indexField} style={{color: 'rgba(0, 0, 0, 0.2) !important'}} onClick={(e) => handleClickFilterInProjectCard(field.id)}>{field.name}</li>
                                                                })
                                                            }
                                                            {
                                                                project.fields.length > 2 ? <li>...</li> : ''
                                                            }
                                                        </ul>
                                                    </div>
                                                    <Link
                                                        to={`/projects/detail/${project.id}`}
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <h4 className="fw-bold text-uppercase product-card__description__name">
                                                            {renderHighlightOnSearch(project.name)}
                                                        </h4>
                                                    </Link>
                                                        <div className="card-text product-card__description__brief">
                                                            {
                                                                project.introduction && project.introduction.length > 0 ? <>
                                                                    <span>{project.introduction.substring(0, 300)}</span>
                                                                    {project.introduction.length > 300 && <span>...</span>}
                                                                </>
                                                                :  
                                                                <span dangerouslySetInnerHTML={{ __html: renderBrief(project?.keyValues[0]?.value)}}></span>
                                                            }
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 product-card__related-info"> 
                                                <div className='product-card__related-info__title'>Tác giả: </div>
                                                <div className='product-card__related-info__value'>{project.author.substring(0, 200)} {project.author.length > 200 ? '...' : ''}</div>
                                            </div>
                                            <div className="col-lg-3 product-card__image">
                                                <img src={`${apiGetProjects}/view-image/${project.image}`} alt='filter'/>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                            <div className='home__pagination' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
                                <Pagination count={numberOfPage} page={currentPgae} onChange={changePage} />
                            </div>
                        </> 
                        : 
                        <>
                            <div className='row' style={{height: '200px', width: '100%'}}>
                                <div className='col-md-4'></div>
                                <div className='col-md-4' style={{textAlign: 'center', lineHeight: '200px', fontSize: '20px'}}>
                                    <img src={require('../../../../assets/images/nodata.png')} alt='' height="100px" width="150px" style={{marginRight: '10px'}}/>
                                    Không có dữ liệu
                                </div>
                                <div className='col-md-4'></div>
                            </div>
                        </>}
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