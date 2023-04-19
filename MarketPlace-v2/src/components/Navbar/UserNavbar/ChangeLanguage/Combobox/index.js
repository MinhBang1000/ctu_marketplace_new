import React from "react";

const Filter = (props) => {
  const { data, handleChange } = props;

  const handleComboboxChange = (e) => {
    handleChange(e.target.value);
  };

  const renderComboboxProjectType = () => {
    if (data.length) {
      return data.map((item, index) => {
        const { label, value } = item;
        return (
          <option key={index} value={value}>
            {label}
          </option>
        );
      });
    }

    return null;
  };

  return (
    <>
      <select
        className="form-select mk-form-select-container "
        id="inlineFormSelectPref"
        onChange={handleComboboxChange}
      >
        {renderComboboxProjectType()}
      </select>
    </>
  );
};

export default Filter;
