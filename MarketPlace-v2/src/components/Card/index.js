import './index.css'

import React from 'react';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png'

const CardCustom = ({ imgUrl, title, content, btnText, btnLinkTo }) => {
    return (
            <div className="mk-card shadow-sm p-3 bg-body rounded">
                <div className='mk-card-image'>
                    <img
                        style={{width:"100%", height:"100%", objectFit: 'contain'}}
                        src={imgUrl ? imgUrl : logo}
                        alt={imgUrl}
                    />
                </div>
                <div className="mk-card-body">
                    <div>                    
                        <p className="mk-card-text" data-toggle="tooltip" title={content}> {content}</p>
                    </div>

                    <Link to={btnLinkTo}>
                        <Button variant="primary">{btnText}</Button>
                    </Link>
                </div>
            </div>
    )
}

export default CardCustom