import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { retrieveFooterById } from '../../store/footerSlice';

const Footer = () => {
    const [footer, setFooter] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveFooterById(101))
            .then(response => {
                setFooter(response.payload)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderComponent = () => {
        let content = null;
        if(footer){
            content = footer.content;
            return (
                <div 
                    className='container pt-4 pb-4'
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )
        }

        
    }

    return (
        <div 
            style={{ backgroundColor: 'aliceblue' }}
        >
            { renderComponent() }
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { 
        footer: state.footersAdmin.data[1] ? state.footersAdmin.data[1] : {},
    };
};

export default connect(
    mapStateToProps,
    {}
)(Footer);