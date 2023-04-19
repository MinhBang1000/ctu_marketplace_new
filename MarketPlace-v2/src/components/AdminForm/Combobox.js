import React, { useState } from "react";

const ComboboxCustom = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(props.selectedIndex ? props.selectedIndex : 1);

  const renderComboboxContent = (items) => {
    if (items && items.length > 0) {
      return items.map((item, index) => {
        const { name, id } = item;
        return (
          <option key={index} value={id}>
            {name}
          </option>
        );
      });
    }

    return null;
  };

  const handleComboboxChange = (event) => {
    const domainID = event.target.value;
    setChecked(domainID);
    props.onChecked(domainID);
  };

  return (
    <div className="form-group">
      <label className="form-label">{props.label}</label>
      <select
        className="form-control"
        id="inlineFormSelectPref"
        defaultValue={props.selectedIndex ? props.selectedIndex : 1}
        onChange={handleComboboxChange}
      >
        {renderComboboxContent(props.data)}
      </select>
    </div>
  );
};

export default ComboboxCustom;
