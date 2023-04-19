import React from "react";
import { useTranslation } from "react-i18next";

const Filter = (props) => {

  const { projectTypes, status } = props;

  const { t } = useTranslation('common');

  const handleComboboxChange = (e) => {
    props.handleComboboxChange(e)
  }

  const handleRadioClick = (e) => {
    props.handleRadioClick(e)
  }

  const renderComboboxProjectType = () => {
    if (projectTypes.length) {
      return projectTypes.map((item, index) => {
        const { value } = item;
        return (
          <option key={index} value={value}>{ t(`researcher.projects.filter.project-type.${value}`) }</option>
        )
      })
    }

    return null;
  }

  const renderRadioStatus = () => {
    if (Object.values(status).length) {
      return status.map((item) => {
        const { id, name } = item;
        return (
          <React.Fragment key={id}>
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id={id}
              autoComplete="on"
              value={id}
              onClick={handleRadioClick}
            />
            <label className="btn btn-outline-primary mk-rad-status" htmlFor={id}>
              { t(`researcher.projects.filter.project-status.${name}`) }
            </label>
          </React.Fragment>
        )
      })
    }

    return null;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-3 mt-3">
          <label htmlFor="formFile" className="form-label">
            <strong>{ t('researcher.projects.filter.project-type.title') }</strong>
          </label>
          <select className="form-select mk-form-select-container " id="inlineFormSelectPref" onChange={handleComboboxChange}>
            {renderComboboxProjectType()}
          </select>
        </div>

        <div className="col-md-9 mt-3 mb-3">
          <label className="form-label">
            <strong>{ t('researcher.projects.filter.project-status.title') }</strong>
          </label>
          <div className="mk-rad-status-container">
            {renderRadioStatus()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
