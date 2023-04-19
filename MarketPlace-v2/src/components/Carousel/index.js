import './index.css'

import React from 'react';
import { Carousel } from 'react-bootstrap';

import Card from '../Card'

const CarouselCustom = ({ items }) => {

    const renderList = (list) => {
       if(list){
            const carouselItems =  list.map((item, index) => {
                const { projectImage, name } = item

                return (
                    <Carousel.Item 
                        key={index} 
                    >
                        {/* <img
                            className="d-block carousel-item-img img-fluid w-25"  
                            src={`${ projectImage }`}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <section className='text-black-50'>
                                { name }
                            </section>
                        </Carousel.Caption> */}
                        <Card
                            // imgUrl={ card.imgUrl }
                            // props.project.projectImage ? props.project.projectImage : props.project.productImage
                            imgUrl={ projectImage ? projectImage : null }
                            title={ name }
                            content={ name }
                            btnText={ `Xem chi tiết` }
                            // btnLinkTo={ `/san-pham/chi-tiet/${card.type}/${card.id}/${card.code}` }
                        />
                    </Carousel.Item>
                    // <div class="carousel-item">
                    //     <img 
                    //         src={`${ projectImage }`} 
                    //         className="d-block w-100" alt="..." 
                    //     />
                    // </div>
                )
            })

            return (
                <Carousel>
                    { carouselItems }
                </Carousel>
                // <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                //     <div className="carousel-inner">
                //         { carouselItems }
                //     </div>
                // </div>
            ) 
       }
       return (
           <>
                Nothing to show
           </>
       )
    }

    return (
        <>
            { renderList(items) }
        </>
    )
}

export default CarouselCustom