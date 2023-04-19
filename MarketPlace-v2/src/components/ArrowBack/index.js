import React from 'react';
import { useHistory } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ArrowBack = () => {
    
    const history = useHistory();

    return (
        <>
            <button 
                className="btn"
                onClick={() => history.goBack()}>
                <ArrowBackIcon />
            </button>
        </>
    )
}

export default ArrowBack;