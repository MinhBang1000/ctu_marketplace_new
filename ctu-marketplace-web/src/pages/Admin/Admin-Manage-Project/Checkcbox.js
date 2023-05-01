import React from 'react';

const CheckboxCustom = ({ fieldName, field, label, isChecked, onCheckboxChange }) => {

    const [checked, setChecked] = React.useState(isChecked);

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        onCheckboxChange(fieldName, isChecked)
    };

    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                id="flexCheckDefault" 
                checked={checked}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                { label }
            </label>
        </div>
    );
}

  
export default CheckboxCustom