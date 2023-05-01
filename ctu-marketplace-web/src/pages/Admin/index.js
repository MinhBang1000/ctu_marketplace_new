import React, { useEffect } from 'react';

import { seo } from '../../libs/helper'
import { SEO_ADMIN } from '../../libs/constants-seo'

const AdminPage = () => {

    useEffect(() => {
        seo({
            title: SEO_ADMIN.title,
            metaDescription: SEO_ADMIN.metaDescription
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <div className='row'>
                <div className="col border">
                    <div className="content">
                        <div className='row'>
                            Admin page
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage