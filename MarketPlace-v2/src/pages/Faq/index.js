import React, { useEffect } from 'react';

import Loading from "../Loading";

import { connect, useDispatch } from "react-redux";
import { retrieveFaqs } from "../../store/faqSlice";

import Accordion from '../../components/Accordion'

import { seo } from '../../libs/helper'
import { SEO_FAQ } from '../../libs/constants-seo'

const Faq = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        seo({
            title: SEO_FAQ.title,
            metaDescription: SEO_FAQ.metaDescription
        });
        dispatch(retrieveFaqs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderList = () => {
        if(!props.faqs.isloading){
            if(props.faqs.data) {
                return (
                    <Accordion items={props.faqs.data ? Object.values(props.faqs.data) : []}/>
                )
            }
            return null
        }
        return <Loading />
    }

    return (
        <div className='container mt-4'>
            { renderList() }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        faqs: state.faqs,
    };
  };
  
export default connect(
    mapStateToProps,
    {}
)(Faq);