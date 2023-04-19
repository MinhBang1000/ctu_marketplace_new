import React from 'react';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className="d-flex flex-column">
                    <Link to="/" className="link-home">
                        Go Home
                    </Link>
                    <img
                        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                        alt="not-found"
                    />
                    
            </div>
        </>
    )
}

export default NotFound;    