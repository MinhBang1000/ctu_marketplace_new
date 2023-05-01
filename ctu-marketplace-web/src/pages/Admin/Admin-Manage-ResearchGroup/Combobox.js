import React, { useState } from 'react';
import Select from 'react-select';

const ComboboxCustom = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [checked, setChecked] = useState(props.selectedIndex ? props.selectedIndex : { value: '', label: '' });
    
    const renderOptions = (items) => {
        const rendereditems =  items && items.length > 0
            ? items.map(item => {
                return {
                    value: props.type === 'user' ? item.username : item.id,
                    label: item.name ? item.name : item.username
                }
            }) 
            : null

        return rendereditems;
    }

    const handleChange = (selectedOption) => {
        props.onChecked(selectedOption.value)
    };

    return (
        <>
            <div className='form-group'>
                <label>{ props.label }</label>
                <Select
                    defaultValue={checked}
                    onChange={handleChange}
                    options={renderOptions(props.data)}
                />
            </div>
        </>
    )
}

  
export default ComboboxCustom