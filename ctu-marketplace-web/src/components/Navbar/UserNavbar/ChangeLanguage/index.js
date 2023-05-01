import React, { useState } from "react";

const ChangeLanguage = (props) => {
  const { data, handleChange } = props;

  const [currentLanguage, setCurrentLanguage] = useState(data && data.length > 0 ? data[0].value : "");

  const handleChangeLanguage = (value) => {
    setCurrentLanguage(value);
    handleChange(value);
  };

  const renderLanguages = () => {
    if (data.length) {
      return data.map((item, index) => {
        const { value } = item;
        return (
          <React.Fragment key={index}>
            <span 
              key={index} 
              style={{ cursor: "pointer" }}
              className={`${currentLanguage === value ? "fw-bold text-white" : "text-white-50"}`}
              onClick={e => handleChangeLanguage(value)}
            >
              <span className="d-flex align-items-center gap-2 ">
                <span className="text-uppercase">
                  { value }
                </span>
              </span>
            </span>
            { index !== data.length - 1 ? <div style={{ width: '2px' }} className="vr text-white fw-bold mx-1 align-items-center"></div> : null }
          </React.Fragment>
        );
      });
    }

    return null;
  };

  return (
    <>
      <div className="d-flex">
        { renderLanguages() }
      </div>
    </>
  );
};

export default ChangeLanguage;
