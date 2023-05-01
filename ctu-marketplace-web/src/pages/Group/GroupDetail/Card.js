// import './CardCustom.css'

import React from "react";
// import Card from "@material-tailwind/react/Card";
// import CardBody from "@material-tailwind/react/CardBody";

// import CardMedia from '@mui/material/CardMedia';
// import CardFooter from "@material-tailwind/react/CardFooter";
// import Button from "@material-tailwind/react/Button";


import logo from '../../../assets/logo.png'


const CardCustom = ({ card }) => {
    const renderImage = (image) => {
        if(image){
             switch(image){
                 case "img1_a": return logo;
                 case "img1_b": return logo;
                 case "img2_a": return logo;
                 case "img2_b": return logo;
                 case "img3_a": return logo;
                 case "img3_b": return logo;
                 case "img5_a": return logo;
                 case "img5_b": return logo;
                 default: return image;
             }
        }
        // const j = Math.floor(Math.random() * ((randomImages.length -1)));
        return logo;
        // return randomImages[j];
     }

    const renderImageSrc = (card) => {
        const avatar = card.userProfile ? card.userProfile?.avatar : (card.avatar ? card.avatar : logo);
        if(avatar){
            if(avatar.length === 2){
                return avatar[0];
            }
            else return avatar;
        }
    };

    const renderName = (name) => {
        if(name){
            if (name.length > 40) {
                var shortname = name.substring(0, 40) + " ...";
                return shortname;
            }
        }
        return name;
    }

    

    const renderDescription = (description) => {
        if(description){
           if(Array.isArray(description)){
                let descriptionStr = '';
                description.map(uuDiem => {
                    return descriptionStr += uuDiem;
                })
                if(descriptionStr.length > 90){
                    var shortDescription = descriptionStr.substring(0, 90) + "...";
                    return shortDescription;
                }
           }
           return description;
        }
    };

    const renderComponent = () => {
        if(card){
            return (
                <div className="card border-2 shadow-sm">
                    <div>
                        <img
                            src={ card?.productImage ? card?.productImage : renderImage(renderImageSrc(card)) } 
                            alt={ card.ten }
                            className="object-cover object-center w-full my-2 rounded-lg max-h-64"
                        />
                    </div>
                    <div className="card-body text-left">
                        <div className="text-xl font-bold">{ renderName(card.fullName) }</div>
                        <div 
                            className="mt-6"
                            dangerouslySetInnerHTML={{ __html: renderDescription(card.qualification) ? renderDescription(card.qualification).substring(0, 100) : '' }} 
                        />
                        <div 
                            className="mt-6"
                            dangerouslySetInnerHTML={{ __html: renderDescription(card.email) ? renderDescription(card.email).substring(0, 100) : '' }} 
                        />
                    </div>
                </div>
            )
        }

        return null;
    }
    
    return (
        <>
            { renderComponent() }
        </>
    );
}

export default CardCustom;