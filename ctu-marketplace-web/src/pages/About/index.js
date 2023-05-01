import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { retrieveAboutById } from '../../store/aboutSlice';

import { SEO_ABOUT } from '../../libs/constants-seo';
import { seo } from '../../libs/helper';

const About = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        seo({
            title: SEO_ABOUT.title,
            metaDescription: SEO_ABOUT.metaDescription
        });
        dispatch(retrieveAboutById(101))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAbout = () => {
        if(props.about && props.about.content){
            return (
                <div className="container mt-4" 
                    dangerouslySetInnerHTML={{ __html: props.about ? props.about.content : '' }} 
                />
            )
        }
        return (
            <div>Không có giới thiệu</div>
        )
    }

    return (
        renderAbout()
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        about: state.abouts.data[101],
    };
};

export default connect(
    mapStateToProps,
    {}
)(About);