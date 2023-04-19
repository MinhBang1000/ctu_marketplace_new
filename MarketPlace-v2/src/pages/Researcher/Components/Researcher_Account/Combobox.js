import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ComboboxCustom = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(props.selectedIndex ? props.selectedIndex : 0);

    const renderCombobox = (items) => {

        const renderedItems 
                =  items 
                    ? items.map((item) => {
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
            {/* <FormControl>
                <InputLabel id="select-category">{ props.label }</InputLabel>
                <Select
                    disabled={props.disabled ? props.disabled : false}
                    labelId="select-category"
                    id="demo-simple-select-standard"
                    // value={1}
                    defaultValue={props.selectedIndex ? props.selectedIndex : 1}
                    onChange={handleComboboxChange}
                    label={props.label}
                >
                    { renderCombobox(props.data) }
                </Select>
            </FormControl> */}
            <>
                <div className='form-group'>
                    <label>{ props.label }</label>
                    <Form.Select 
                        aria-label="Default select example" 
                        onChange={handleComboboxChange}
                        value={checked}
                    >
                        { renderCombobox(props.data) }
                    </Form.Select>
                </div>
            </>
        </>
    )
}

  
export default ComboboxCustom