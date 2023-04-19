import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Slide from './Slide';

const TYPE_COMMERCIAL = 'commercial'
const TYPE_RESEARCHING = 'researching'
const TYPE_IDEA = 'idea'

const ControlledCarousel = ({ projects, groups }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

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

    const renderList = () => {
        if (projects) {
            const carouselItems = projects.map((item,index) => {
                const { name, shortDescription, projectImage } = item

                return (
                    <Carousel.Item
                        style={{ backgroundColor: 'white', opacity: 0.8 }}
                        key={index}
                    >
                        <Link
                            to={`/san-pham/chi-tiet/${translateProjectTypeToVN(item.projectType)}/${item.id}`}
                        >
                            <Slide title={name} content={shortDescription} image={projectImage} />
                        </Link>
                    </Carousel.Item>
                )
            })

            return (
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {carouselItems}
                </Carousel>
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
            {renderList()}
        </>
    );
}

export default ControlledCarousel;