/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createContact } from '../../../../store/contact.contactSlice';

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useTranslation } from 'react-i18next';
import { SEO_CONTACT } from '../../../../libs/constants-seo';
import { seo } from '../../../../libs/helper';

const items = [
    {
        icon: <LocationOnIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                Đại học Cần Thơ
                Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
            </section>
        )
    },
    {
        icon: <EmailIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                dhct@ctu.edu.vn
            </section>
        )
    },
    {
        icon: <CallIcon color="primary" fontSize="large" />,
        value: (
            <section className="font-medium">
                (84-292) 3832663 Fax: (84-292) 3838474
            </section>
        )
    }
]

const Contact = (props) => {

    const [contact, setContact] = React.useState({});

    const alertUseAlert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { t } = useTranslation('common');

    useEffect(() => {
        seo({
            title: SEO_CONTACT.title,
            metaDescription: SEO_CONTACT.metaDescription
        });
    }, [])

    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <section key={index} className="row mb-3">
                    <section className="col-sm-1">
                        { item.icon }
                    </section>
                    <section className="col-sm-11">
                        <section className="">
                            { item.value }
                        </section>
                    </section>
                </section>
            )
        })
    }

    const handleContentChange = (field, content) => {
        setContact( previousState => ({
            ...previousState, 
            [field]: content
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createContact(contact))
            .then(() => {
                alertUseAlert.show('Đã gửi liên hệ thành công!')
                history.push('/')
            })
        
    }
 
    return (
        <div className="container mt-4 mb-4">
            <div className="row mx-auto gap-4">
                <section className="col d-flex align-items-center justify-content-center text-center bg-white">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841518408644!2d105.76842661474251!3d10.029933692830634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1634910577020!5m2!1svi!2s" 
                        width="600" 
                        height="600" 
                        style={{ border: 0 }} 
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </section>
                <section className="col">
                    <h3 className='mb-3 text-uppercase'>{ t('contact.title') }</h3>
                    <div className="mb-3">
                        { renderItems() }
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={ t('contact.form.name') } 
                                onChange={e => handleContentChange('fullName', e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder={ t('contact.form.email') } 
                                onChange={e => handleContentChange('email', e.target.value)} 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={ t('contact.form.phone') } 
                                onChange={e => handleContentChange('phoneNumber', e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={ t('contact.form.title') }  
                                onChange={e => handleContentChange('title', e.target.value)} 
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <textarea 
                                required
                                className="form-control" 
                                placeholder={ t('contact.form.content') }   
                                onChange={e => handleContentChange('content', e.target.value)}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <button 
                                className="btn btn-success" 
                                type='submit'
                            >
                                { t('contact.form.btn-text') }
                            </button>
                        </div>
                    </form>
                </section>
                
            </div>
        </div>
    )
}


export default connect(
    null, 
    {}
)(Contact);