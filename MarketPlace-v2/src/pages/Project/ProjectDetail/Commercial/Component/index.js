import React from 'react';

import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

import logo from '../../../../../assets/logo.png';

const ProjectDetail = (props) => {

    const {
        name,
        projectImage,
        author,
        createdDate,
        shortDescription,
        projectFieldList,
        process,
        avatar,
        advantage,
        
    } = props.project

    const renderProjectField = (fields) => {
        return fields.map((field, index) => {
            return (
                <Link 
                    key={index}
                    to={'/'}>
                    { field.field.name }
                </Link>
            )
        })
    }

    const renderNewProjects = () => {
        const renderedItems = props.projects.map((project, index) => {
            return (
                <li key={index}> 
                    <img 
                        src={ project.projectImage } 
                        alt="" 
                        style={{ width: '100px', height: '100px' }}
                    /> 
                    <strong>
                        <Link to={'/'}>
                            { project.name }
                        </Link>
                    </strong> 
                    <span className="pdate">
                        <i className="fas fa-calendar-alt"></i> 
                        { dateFormat(project.createdDate, "HH:MM, dddd, mmmm dS, yyyy") }
                    </span> 
                </li>
            )
        })
        return (
            <ul className="lastest-products d-flex">
                { renderedItems }
            </ul>
        )
    }

    return (
        <>
            <section className="wf100 p80 blog">
                <div className="blog-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="blog-single-content">
                            <div className="blog-single-thumb">
                                <img src={ projectImage } alt="" />
                            </div>
                            <h3>{ name }</h3>
                            <ul className="post-meta">
                                <li>
                                    <i className="fas fa-user-circle"></i> 
                                    { author }
                                </li>
                                <li>
                                    <i className="fas fa-calendar-alt"></i> 
                                    { dateFormat(createdDate, "HH:MM, dddd, mmmm dS, yyyy") }
                                </li>
                            </ul>

                            <p>
                                { shortDescription }
                            </p>

                            <h5>Chi tiết dự án</h5>
                            <div 
                                dangerouslySetInnerHTML={{ __html: process }} 
                            />

                            <div 
                                dangerouslySetInnerHTML={{ __html: advantage }} 
                            />

                            <div className="author-box wf100">
                                <img src={ avatar ? avatar : logo } alt="" />
                                <h5>Tác giả</h5>
                                { author }
                            </div>
                            
                            <div className="wf100 comment-form">
                                <h4>Liên hệ với chúng tôi</h4>
                                <ul>
                                    <li className="w3">
                                        <input type="text" className="form-control" placeholder="Họ tên" />
                                    </li>
                                    <li className="w3">
                                        <input type="text" className="form-control" placeholder="Email" />
                                    </li>
                                    <li className="w3 np">
                                        <input type="text" className="form-control" placeholder="Tiêu đề" />
                                    </li>
                                    <li className="full">
                                        <textarea className="form-control" placeholder="Nội dung"></textarea>
                                    </li>
                                    <li className="full">
                                        <button className="post-btn">Gửi</button>
                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="sidebar">
                                <div className="side-widget">
                                    <h5>Tìm kiếm</h5>
                                    <div className="side-search">
                                        <form>
                                            <input type="Thông tin dự án" className="form-control" placeholder="Thông tin dự án" />
                                            <button><i className="fas fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="side-widget mt-2">
                            <h5>Dự án cùng thể loại</h5>
                            { renderNewProjects() }
                        </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default ProjectDetail;