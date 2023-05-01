/* eslint-disable eqeqeq */
import _ from "lodash";
import React from "react";
import { Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CustomDialog } from "react-st-modal";
import "./index.css";

import { createCustomerContact } from "../../store/customer.contactSlice";

import { useTranslation } from "react-i18next";
import { columns } from "./contact.fields";
import FormEdit from "./Form";

import Template1 from "./Templates/Template1";
import Template2 from "./Templates/Template2";

const OTHER_ID = "999";

const PREVIEWPAGE_TYPE_CREATE = "create";
const PREVIEWPAGE_TYPE_PREVIEW = "preview";

const TYPE_COMMERCIAL = "commercial";
const TYPE_RESEARCHING = "researching";
const TYPE_IDEA = "idea";

const ProjectPreview = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { isEnableChangeTemplate, previewType, project, relatedProjects, navbar, content } =
    props;

  const renderFieldsPreview = (projectFields) => {
    let fieldsFormat = [];
    if (projectFields && projectFields.length > 0) {
      fieldsFormat = projectFields.map((field, index) => {
        // eslint-disable-next-line eqeqeq
        let result;
        if (PREVIEWPAGE_TYPE_CREATE === previewType) {
          if (props.fields[field]) {
            result = props.fields[field];
          } else {
            // eslint-disable-next-line array-callback-return
            Object.values(props.fields).map((propsField) => {
              let tmpResult = propsField.childOfFieldList.find(
                (item) => item.id == field
              );
              result = tmpResult ? tmpResult : result;
              if (!result) {
                propsField.childOfFieldList.map((childItem) => {
                  tmpResult = childItem.childOfFieldList.find(
                    (item) => item.id == field
                  );
                  result = tmpResult ? tmpResult : result;
                  return result;
                });
              }
            });
          }
        }

        if (PREVIEWPAGE_TYPE_PREVIEW === previewType) {
          result = result ? result : field.field;
        }
        return <div key={index}>{result ? result.name : null}</div>;
      });
    }

    return fieldsFormat;
  };

  const renderContentByType = (fieldName, type, label, children, icon) => {
    switch (type) {
      case "text":
      case "email":
        if("website" === fieldName){
          let link = "";
          if(project && project[fieldName]){
            link = project[fieldName].toString().includes("https://") ? project[fieldName] : ("https://" + project[fieldName]);
          }
          
          return (
              <React.Fragment key={fieldName}>
                <div className="mk-project-nav-item-container">
                  <div className="col-1 mk-project-nav-icon">
                    <i className={`${icon} `} aria-hidden="true"></i>
                  </div>
                  <div className="col-11 mk-project-nav-label">
                    <h5 className="mb-0">{t(`project.commercial.${fieldName}`)}</h5>
                  </div>
                </div>
                <div role="button" onClick={() => window.open(link, "_blank",'noopener,noreferrer')} className="mk-project-email-website">
                  <span className="mk-project-nav-info">{project[fieldName]}</span>
                </div>
              </React.Fragment>
          )
        }
        
        if("email" === fieldName){
          const email = project[fieldName] ?? "";
          const emailSubject = `Lien he ve san pham ${project.name ?? ""}`;
          const emailBody = "Noi dung lien he";

          return (
            <React.Fragment key={fieldName}>
              <div className="mk-project-nav-item-container">
                <div className="col-1 mk-project-nav-icon">
                  <i className={`${icon} `} aria-hidden="true"></i>
                </div>
                <div className="col-11 mk-project-nav-label">
                  <h5 className="mb-0">{t(`project.commercial.${fieldName}`)}</h5>
                </div>
              </div>
              <div role="button" onClick={() => window.open(`mailto:${email}?subject=${emailSubject}&body=${emailBody}`)} className="mk-project-email-website">
                <span className="mk-project-nav-info">{project[fieldName]}</span>
              </div>
          </React.Fragment>
          )
        }

        return (
          <React.Fragment key={fieldName}>
            <div className="mk-project-nav-item-container">
              <div className="col-1 mk-project-nav-icon">
                <i className={`${icon} `} aria-hidden="true"></i>
              </div>
              <div className="col-11 mk-project-nav-label">
                <h5 className="mb-0">{t(`project.commercial.${fieldName}`)}</h5>
              </div>
            </div>
            <div>
              <span className="mk-project-nav-info">{project[fieldName]}</span>
            </div>
          </React.Fragment>
        );
      case "editor":
        return (
          <React.Fragment key={fieldName}>
            <h5>{t(`project.commercial.${fieldName}`)}</h5>
            <div>
              <div dangerouslySetInnerHTML={{ __html: project[fieldName] }} />
            </div>
          </React.Fragment>
        );
      case "checkbox":
        let result = [];
        if (props[children]) {
          if (project[fieldName] && project[fieldName].length > 0) {
            // eslint-disable-next-line array-callback-return
            result = Object.values(project[fieldName]).map((item, index) => {
              if (PREVIEWPAGE_TYPE_CREATE === previewType) {
                if (item[Object.keys(item)[0]] != OTHER_ID) {
                  let filteredItem;
                  filteredItem = Object.values(props[children][0]).filter(
                    (x) => "" + x.id === "" + item[Object.keys(item)[0]].id
                  );
                  if (filteredItem[0]) {
                    return <div key={index}>{filteredItem[0].name}</div>;
                  }

                  const value = Object.values(props[children])[0][
                    Object.values(item)[0]
                  ]
                    ? Object.values(props[children])[0][Object.values(item)[0]]
                        .name
                    : null;
                  return <div key={fieldName}>{value}</div>;
                } else return <div key={fieldName}>{item[Object.keys(item)[1]]}</div>;
              }

              if (PREVIEWPAGE_TYPE_PREVIEW === previewType) {
                if (item[Object.keys(item)[0]].id != OTHER_ID) {
                  return <div key={`${fieldName}-${index}`}>{item[Object.keys(item)[0]].name}</div>;
                } else {
                  return <React.Fragment key={`${fieldName}-${index}`}>{ item[Object.keys(item)[1]] }</React.Fragment>;
                }
              }
            });
          }
        }

        return (
          <React.Fragment key={fieldName}>
            <div className="mk-project-nav-item-container">
              <div className="col-1 mk-project-nav-icon">
                <i className={`${icon} `} aria-hidden="true"></i>
              </div>
              <div className="col-11 mk-project-nav-label">
                <h5 className="mb-0">{t(`project.commercial.${fieldName}`)}</h5>
              </div>
            </div>
            <div>
              <span className="mk-project-nav-info">{result}</span>
            </div>
          </React.Fragment>
        );
      case "checkboxTreeView":
        return (
          <React.Fragment key={fieldName}>
            <div className="mk-project-nav-item-container">
              <div className="col-1 mk-project-nav-icon">
                <i className={`${icon} `} aria-hidden="true"></i>
              </div>
              <div className="col-11 mk-project-nav-label">
                <h5 className="mb-0">{t(`project.commercial.${fieldName}`)}</h5>
              </div>
            </div>
            <div>
              <span className="mk-project-nav-info">
                {renderFieldsPreview(project[fieldName])}
              </span>
            </div>
          </React.Fragment>
        );
      case "image":
        return null;
      default:
        return (
          <div className="d-flex flex-column" key={fieldName}>
            <div className="fw-bold row">{label}</div>
            <p>{project[fieldName]}</p>
          </div>
        );
    }
  };

  const onContactSubmit = (value) => {
    const submitData = { ...value, projectId: value.id };
    return dispatch(createCustomerContact(submitData));
  };

  const renderAdminFormFields = () => {
    if (columns && columns.length > 0) {
      return columns.map((column) => {
        return {
          ...column,
          headerName: t(
            `admin.admin-manage-info-form.header.${column.headerName.toUpperCase()}`
          ),
        };
      });
    }

    return null;
  };

  const onBtnContactClick = async (value) => {
    const formConfig = {
      btnOk: t("project.commercial.other-action.form.btn-ok"),
      btnCancel: t("project.commercial.other-action.form.btn-cancel"),
    };

    const pickedFieldsProject = _.pick(value, "id", "name");
    await CustomDialog(
      <FormEdit
        formConfig={formConfig}
        initialValue={pickedFieldsProject}
        fields={renderAdminFormFields()}
        onSubmit={onContactSubmit}
      />,
      {
        title: t("project.commercial.other-action.form.title"),
        showCloseIcon: true,
      }
    );
  };

  const renderOtherActions = () => {
    return (
      <>
        <button
          className="btn btn-success rounded-3 w-100 fw-bold"
          onClick={(e) => onBtnContactClick(project)}
        >
          {t("project.commercial.other-action.btn-text")}
        </button>
      </>
    );
  };

  const renderContent = (content) => {
    const renderList = () => {
      if (content && Object.keys(content).length > 0) {
        return Object.keys(content).map((key) => {
          const { fieldName, type, label, children, icon } = content[key];
          return (
            <div className="mk-project-nav-item" key={fieldName}>
              {renderContentByType(fieldName, type, label, children, icon)}
            </div>
          );
        });
      }
      return null;
    };

    return <div className="mk-project-nav">{renderList()}</div>;
  };

  const translateProjectTypeToVN = (projectTye) => {
    switch (projectTye) {
      case TYPE_COMMERCIAL:
        return "thuong-mai";

      case TYPE_RESEARCHING:
        return "nghien-cuu";

      case TYPE_IDEA:
        return "y-tuong";

      default:
        break;
    }
  };

  const renderRelatedProjects = () => {
    let renderedItems;
    if (relatedProjects && relatedProjects.length > 0) {
      renderedItems = relatedProjects.slice(0, 3).map((propsProject, index) => {
        return (
          <div className="col-lg-4 mk-related-project" key={index}>
            <div className="mk-card shadow-sm p-3 bg-body rounded">
              <div className="mk-card-image">
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    propsProject.productImage
                      ? propsProject.productImage
                      : propsProject.projectImage
                  }
                  alt={propsProject.name}
                />
              </div>
              <div className="mk-card-body">
                <p className="mk-card-text">{propsProject.name}</p>
              </div>
              <Link
                to={`/san-pham/chi-tiet/${translateProjectTypeToVN(
                  propsProject.projectType
                )}/${propsProject.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  {t("project.commercial.related-projects.btn-text")}
                </Button>
              </Link>
            </div>
          </div>
        );
      });
    }
    return <div className="row">{renderedItems}</div>;
  };

  // const onDropdownSelect = (selectedTemplate) => {
  //     setTemplate(selectedTemplate);
  // }

  const renderTemplate = () => {
    if(!isEnableChangeTemplate && !project.template){
      return (
        <Template1
          project={project}
          renderedNavbar={renderContent(navbar)}
          renderedContent={renderContent(content)}
          renderedOtherActions={renderOtherActions()}
          renderRelatedProjects={renderRelatedProjects()}
        />
      );
    }

    let template= isEnableChangeTemplate?.template || project.template;

    if (template === 1) {
      return (
        <Template1
          project={project}
          renderedNavbar={renderContent(navbar)}
          renderedContent={renderContent(content)}
          renderedOtherActions={renderOtherActions()}
          renderRelatedProjects={renderRelatedProjects()}
        />
      );
    }

    if (template === 2) {
      return (
        <Template2
          project={project}
          renderedNavbar={renderContent(navbar)}
          renderedContent={renderContent(content)}
          renderedOtherActions={renderOtherActions()}
          renderRelatedProjects={renderRelatedProjects()}
        />
      );
    }
  };

  return (
    <>
      {/* <DropDownTemplate 
        data={data}
        onDropdownSelect={onDropdownSelect}
      /> */}
      {renderTemplate()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fields: state.fields.data ? Object.values(state.fields.data) : [],
    levels: state.developmentLevels.data
      ? Object.values(state.developmentLevels)
      : [],
    transmisstions: state.transmisstionMethods.data
      ? Object.values(state.transmisstionMethods)
      : [],
  };
};

export default connect(mapStateToProps, {})(ProjectPreview);
