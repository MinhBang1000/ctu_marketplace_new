import React from 'react';

import logo from '../../../assets/logo.png'

const SlideCustom = (item) => {

    const renderComponent = () => {
        if(item){
            const { title, content, image, caption } = item;

            return (
                    <div 
                        className="p-3"
                    >
                        <h4 
                            className='fw-bold'
                        >
                            { title }
                        </h4>
                        <div className='col'>
                            <img 
                                src={image ? image : logo}
                                alt="CarouselImage" 
                            />
                        </div>
                        <p className='mk-carousel-description' >
                            {content}
                        </p>
                        <p className=''>
                            { caption }
                        </p>
                    </div>
            )
        }

        return null;
    }

    return (
        <>
            { renderComponent() }
        </>
    )
}

export default SlideCustom;