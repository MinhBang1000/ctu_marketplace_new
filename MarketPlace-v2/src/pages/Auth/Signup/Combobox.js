import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

const ComboboxCustom = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(1);

    useEffect(() => {
        // props.fetchDomains()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderCombobox = (items) => {

        const renderedItems 
                =  items && items.length > 0
                    ? items.map((item, index) => {
                        return (
                            <option 
                                key={item.name} 
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        )
                    })
                    : null
        return renderedItems
        
    }

    const handleComboboxChange = (event) => {
        const domainID = event.target.value 
        setChecked(domainID)
        props.onChecked(domainID)
    };

    return (
        <>
            <div className='form-group'>
                <label>{ props.label }</label>
                <Form.Select aria-label="Default select example" onChange={handleComboboxChange}>
                    { renderCombobox(props.data) }
                </Form.Select>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        // domains:  Object.values(state.domains),
    };
}
  
export default connect(
    mapStateToProps, 
    {}
)(ComboboxCustom);