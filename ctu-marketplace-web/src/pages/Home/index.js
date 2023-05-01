import './index.css';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';
import Carousel from '../../components/Carousel/test';

import { connect, useDispatch } from "react-redux";
import { retrieveHomeVideoById } from "../../store/homeVideoSlice";
import { retrieveProjects } from "../../store/projectSlice";
import { retrieveResearchGroups } from "../../store/researchGroupSlice";

import defaultIntroVideo from '../../assets/growag-introduction.mp4';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO_HOME } from '../../libs/constants-seo';
import { seo } from '../../libs/helper';
import HomeSearch from '../../components/Maintain/HomeSearch/HomeSearch';
import ProductCard from '../../components/Maintain/ProductCard/ProductCard';

import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import Project from '../../api/project';

const TYPE_COMMERCIAL = 'commercial'
const TYPE_RESEARCHING = 'researching'
const TYPE_IDEA = 'idea'

const Home = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('common');
    const videoRef = useRef();

    const [introVideoUrl, setIntroVideoUrl] = useState(null);

    const [productList, setProductList] = useState([1,2,3]);

    const listProduct = null;

    useEffect(() => {
        videoRef.current?.load();
    }, [introVideoUrl]);

    useEffect(() => {
        seo({
            title: SEO_HOME.title,
            metaDescription: SEO_HOME.metaDescription
        });
        dispatch(retrieveResearchGroups())
        dispatch(retrieveProjects())
        dispatch(retrieveProjects())
        dispatch(retrieveHomeVideoById(101))
        .then(res => {
            setIntroVideoUrl(res.payload?.url)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
        const fetchApi = async () => {
            try {
                const res = await axios.get('https://marketplace.ctu.edu.vn/api/v2/public/projects/commercial');
                console.log("Res: ", res.data.data);
                setProductList(res.data.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        fetchApi();

    }, []) 

    const renderProjectList = (projectList) => {
        return projectList.map(item => {
            return (
                <div key={item.name}>
                    <ProductCard 
                        projectType={item.projectType}
                        projectName={item.name}
                        projectDescription={item.shortDescription}
                        projectAuthor={item.author}
                        projectImage={item.projectImage}
                    />
                </div>
            )
        })
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


    // const renderProjects = (cards) => {
    //     return cards
    //         .slice(0, 3)
    //         .map((card, index) => {
    //             return (
    //                 <div
    //                     key={index}
    //                     className={`col-lg-4`}
    //                 >
    //                     <Card
    //                         imgUrl={card.projectImage ? card.projectImage : card.productImage}
    //                         title={card.title}
    //                         content={card.name}
    //                         btnText={t('home.card.btn-text')}
    //                         btnLinkTo={`/san-pham/chi-tiet/${translateProjectTypeToVN(card.projectType)}/${card.id}`}
    //                     />
    //                 </div>
    //             )
    //         })
    // }
    // const renderGroups = (groups) => {
    //     if (groups && groups.length > 0) {
    //         return groups
    //             .slice(0, 3)
    //             .map((group, index) => {
    //                 return (
    //                     <div
    //                         key={group.id}
    //                         className={`col-sm-4`}
    //                     >
    //                         <Card
    //                             imgUrl={group.projectImage ? group.projectImage : group.groupImage}
    //                             title={group.title}
    //                             content={group.groupName}
    //                             btnText={t('home.card.btn-text')}
    //                             btnLinkTo={`/nhom-nghien-cuu/${group.id}`}
    //                         />
    //                     </div>
    //                 )
    //             })
    //     }

    //     return null;
    // }



    const STATUS_CODE_DA_DUYET = 'DD';
    const hightlightAndADDProjects = props.projects
        ? props.projects.filter(project => project.status.code === STATUS_CODE_DA_DUYET && project.isHighlighted)
        : [];

   

    return (
        <>
            {/* <div className="mk-carousel-video-bg">
                <video
                    className="mk-video-bg"
                    autoPlay
                    loop
                    muted
                    ref={videoRef}
                >
                   
                    <source src="https://marketplace.ctu.edu.vn/api/v2/upload-file/download/default.mp4" type="video/mp4" />
                    Your browser does not support the video tag
                </video>
                <Carousel
                    projects={_.orderBy(hightlightAndADDProjects, ['number'], ['asc'])}
                    groups={props.researchGroups ? props.researchGroups : []}
                    className={`row heroContent`}
                />
            </div> */}
            


            {/* <div className={`container-fluid section-container`} style={{marginTop:"-5px", backgroundColor:"white"}}>
               <div className='container'>
                <div className='row'>
                        <div className={`col`}>
                            <div>
                                <h2 className='text-center text-uppercase'>{ t('home.projects.title') }</h2>
                                <div className='row project-list'>
                                    {renderProjects(props.projects ? props.projects : [])}
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
               </div>
               <div className={`container-fluid section-container`} style={{backgroundColor:"whitesmoke"}}>
               <div className='container'>
                    <div className='row'>
                        <div className={`col`}>
                            <div>
                                <h2 className='text-center text-uppercase'>{ t('home.research-groups.title') }</h2>
                                <div className='row group-list'>
                                    {renderGroups(props.researchGroups ? props.researchGroups : [])}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="search">
                {/* <SearchBar/> */}
                <HomeSearch/>
                {/* <ProductCard/> */}
                {renderProjectList(productList)}
                {/* <Project/> */}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        projects: Object.values(state.projects.data),
        researchGroups: state.researchGroups.data ? Object.values(state.researchGroups.data) : null,
    };
};

export default connect(
    mapStateToProps,
    {}
)(Home);