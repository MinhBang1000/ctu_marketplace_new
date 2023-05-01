import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

import Avatar from "@mui/material/Avatar";

import { logout } from "../../../store/authSlice";

import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.png";
import {
  ROLE_ADMIN, ROLE_NNC, ROLE_SUPER_ADMIN
} from "../../../environments/constraints";
import { ROUTE_PREFIX_NNC } from "../../Router/constants";
import { data } from "./nav.data";

import _ from "lodash";
import { useEffect } from "react";
import { retrievePublicFields } from "../../../store/fieldSlice";
import { retrieveCommercialProjects, retrieveIdeaProjects, retrieveResearchingProjects } from "../../../store/projectSlice";
import ChangeLanguage from "./ChangeLanguage";
import { languages } from "./ChangeLanguage/Combobox/data";
import MultiLevelDropdown from "./MultiLevelDropdown";

const Test = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { t, i18n } = useTranslation('common');

  const [projectFields, setProjectFields] = React.useState(null);

  useEffect(() => {
    dispatch(retrievePublicFields())
    .then(res => {
          let fieldLevel1 = res.payload.filter(item => item.id.toString().length === 1)
          let test = [];
          fieldLevel1.forEach((level1, index) => {
            level1.childOfFieldList.forEach(level2 => {
              level2.childOfFieldList.forEach(item => {
                test.push(item)
              })
            })
            const updatedValue = {...level1, childOfFieldList: test}
            fieldLevel1[index] = updatedValue
      })

      // setProjectFields(res.payload);
      setProjectFields(fieldLevel1);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleChangeShowSubmenu = async (typeOfProject, status, e) => {
    // e.preventDefault();
    if("commercial" === typeOfProject || "researching" === typeOfProject || "idea" === typeOfProject){
        setProjectFields(null);
        let allProjectFields = [];
        let existedProjectFields = [];

        await dispatch(retrievePublicFields())
            .then(res => {
              allProjectFields = res.payload.filter(item => item.id.toString().length === 1)
        }) 
     
        if("commercial" === typeOfProject){

          // *! Chỉ lấy những lĩnh vực có thôi, không phân cấp xem có thuộc thg cha nào ko
            await dispatch(retrieveCommercialProjects())
              .then(res => {
                const projects = res.payload;
                
                let pickedProjectFields = [];
                projects.forEach(project => {
                  project.projectFieldList.forEach(field => {
                    pickedProjectFields = _.unionWith(pickedProjectFields, [field.field], _.isEqual)
                  })
                })
                
                existedProjectFields =  pickedProjectFields;


                allProjectFields.forEach((level1, index) => {
                  const filterExistedProjectFieldsByLevel1 = existedProjectFields.filter(checkedItem => checkedItem?.id?.toString()?.startsWith(level1.id.toString()));
                  let test = [];
                  level1.childOfFieldList.forEach(level2 => {
                    if(level2.childOfFieldList.length > 0){
                      level2.childOfFieldList.forEach(item => {
                        if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === item.id) !== -1){
                          item = {...item, typeOfProject}
                          test.push(item)
                        }
                      })
                    }
                    else {
                      if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === level2.id) !== -1){
                        level2 = {...level2, typeOfProject};
                        test.push(level2)
                      }
                    }

                  })
                  const updatedValue = {...level1, childOfFieldList: test}
                  allProjectFields[index] = updatedValue
            })

            setProjectFields(allProjectFields);

          })  

        }
      
        if("researching" === typeOfProject){
          await dispatch(retrieveResearchingProjects())
                  .then(res => {
                    const projects = res.payload;
                        
                        let pickedProjectFields = [];
                        projects.forEach(project => {
                          project.projectFieldList.forEach(field => {
                            pickedProjectFields = _.unionWith(pickedProjectFields, [field.field], _.isEqual)
                          })
                        })
                        
                        existedProjectFields =  pickedProjectFields;


                        allProjectFields.forEach((level1, index) => {
                          const filterExistedProjectFieldsByLevel1 = existedProjectFields.filter(checkedItem => checkedItem?.id?.toString()?.startsWith(level1.id.toString()));
                          let test = [];
                          level1.childOfFieldList.forEach(level2 => {
                            if(level2.childOfFieldList.length > 0){
                              level2.childOfFieldList.forEach(item => {
                                if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === item.id) !== -1){
                                  item = {...item, typeOfProject}
                                  test.push(item)
                                }
                              })
                            }
                            else {
                              if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === level2.id) !== -1){
                                level2 = {...level2, typeOfProject};
                                test.push(level2)
                              }
                            }

                          })
                          const updatedValue = {...level1, childOfFieldList: test}
                          allProjectFields[index] = updatedValue
                    })

                    setProjectFields(allProjectFields);
          })
        }

        if("idea" === typeOfProject){
          setProjectFields(null);
          await dispatch(retrieveIdeaProjects())
                  .then(res => {
                    const projects = res.payload;
                            
                            let pickedProjectFields = [];
                            projects.forEach(project => {
                              project.projectFieldList.forEach(field => {
                                pickedProjectFields = _.unionWith(pickedProjectFields, [field.field], _.isEqual)
                              })
                            })
                            
                            existedProjectFields =  pickedProjectFields;
            
            
                            allProjectFields.forEach((level1, index) => {
                              const filterExistedProjectFieldsByLevel1 = existedProjectFields.filter(checkedItem => checkedItem?.id?.toString()?.startsWith(level1.id.toString()));
                              let test = [];
                              level1.childOfFieldList.forEach(level2 => {
                                if(level2.childOfFieldList.length > 0){
                                  level2.childOfFieldList.forEach(item => {
                                    if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === item.id) !== -1){
                                      item = {...item, typeOfProject}
                                      test.push(item)
                                    }
                                  })
                                }
                                else {
                                  if(filterExistedProjectFieldsByLevel1.findIndex(checkedItem => checkedItem.id === level2.id) !== -1){
                                    level2 = {...level2, typeOfProject};
                                    test.push(level2)
                                  }
                                }
            
                              })
                              const updatedValue = {...level1, childOfFieldList: test}
                              allProjectFields[index] = updatedValue
                        })
            
                        setProjectFields(allProjectFields);
          })
        }
      
    }
    
  }

  const renderChildren = (item) => {
    if (item.children.length > 0) {
      const renderedItemChildren = item.children.map((child, index) => {
        if("Projects" === item.name){
          return (
            <li 
              key={index} 
              onMouseEnter={(e) => handleChangeShowSubmenu(child.typeOfProject, true, e)} 
            >
              <Link to={child.path} className="dropdown-item">
                {t(`navbar.${child.name}`)}
              </Link>
            </li>
          )
        }
        else {
          return (
            <li key={index}>
              <Link to={child.path} className="dropdown-item">
                {t(`navbar.${child.name}`)}
              </Link>
            </li>
          )
        }
      });

      return (
        <ul className="dropdown-menu" aria-labelledby={item.path}>
          {renderedItemChildren}
        </ul>
      );
    }
    return null;
  };

  const onLogOut = () => {
    dispatch(logout(history));
  };

  const renderURLToHomeBaseOnRole = () => {
    if (props.userProfile && props.userProfile.data) {
      if (props.userProfile.data.role.code === ROLE_NNC) {
        return ROUTE_PREFIX_NNC;
      }
      if (
        props.userProfile.data.role.code === ROLE_ADMIN ||
        props.userProfile.data.role.code === ROLE_SUPER_ADMIN
      ) {
        return "/admin";
      }
    }
    return null;
  };

  const renderUserProfile = () => {
    return (
      <>
        {props.userProfile ? (
          <div className="row align-items-center" style={{ rowGap: "16px" }}>
            <Link
              to={renderURLToHomeBaseOnRole()}
              className="col-lg d-flex align-items-center"
            >
              {/* <AccountCircle fontSize="large" color="action" /> */}
              <Avatar
                alt="Remy Sharp"
                src={`${
                  props.userProfile.data?.avatar
                    ? props.userProfile.data.avatar
                    : logo
                }`}
              />
              {/* <div className='text-white pl-3' style={{marginLeft:"16px",width:"90px"}}>
                            { (props.userProfile && props.userProfile.data) ? props.userProfile.data.fullName : '' }
                        </div> */}
            </Link>
            <div className="col-lg">
              <button
                onClick={() => onLogOut()}
                className="btn btn-danger p-2 text-white rounded-3"
                style={{ width: "100px" }}
              >
                { t('navbar.Logout') }
              </button>
            </div>
          </div>
        ) : (
          <Link
            to={"/dang-nhap"}
            className="btn btn-primary" //btn-success 
            style={{textDecoration: "none", backgroundColor: '#3D69A0', border: '1px solid #3D69A0' }}
            name="btnDangXuat"
          >
            { t('navbar.Login') }
          </Link>
        )}
      </>
    );
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const renderList = () => {

    const items = data.map((item, index) => {
      if (item.children?.length > 0) {
        if("Projects" === item.name){
          item = {...item, useTranslate: true, translatedText: t(`navbar.${item.name}`)};
          for (let index = 0; index < item.children.length; index++) {
            let element = item.children[index];
            if("Commercial-Projects" === element.name || "Researching-Projects" === element.name || "Idea-Projects" === element.name){
              element = {...element, isParent: true};
              const translatedText = t(`navbar.${element.name}`);
              _.chain(item.children)
              .find({name:element.name})
              .merge({children: projectFields, translatedText: translatedText, useTranslate: true, isParent: true}).value();
            }
          }
          
          return <MultiLevelDropdown key={index} initialMenuItems={[item]} handleChangeShowSubmenu={handleChangeShowSubmenu}/>
        }
        return (
          <li className="nav-item dropdown" key={index}>
            <Link
              to={item.path}
              id={item.path}
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ backgroundColor: "#0065C1", color: "white" }}
            >
              {t(`navbar.${item.name}`)}
            </Link>
            {renderChildren(item)}
          </li>
        );
      }
      return (
        <li className="nav-item" key={index}>
          <Link to={item.path} className="nav-link" style={{ color: "white" }}>
            {t(`navbar.${item.name}`)}
          </Link>
        </li>
      );
    });

    return (
      <div className="collapse navbar-collapse" id="navbarButton">
        <div className="navbar-nav ms-auto nav-content align-items-center">
          <ul
            className="navbar-nav"
            style={{ columnGap: "10px", paddingRight: "32px" }}
          >
            {items}
          </ul>
          <div className="btnAuth">{renderUserProfile()}</div>
          <div className="change-language d-flex align-items-center align-self-center">
           <i className="fas fa-globe-asia text-white" style={{marginRight:'10px'}}></i>
            <ChangeLanguage data={languages} handleChange={changeLanguage} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className="mk-header navbar navbar-expand-lg"
        style={{ backgroundColor: "rgb(0 0 0)" }}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center gap-2 align-items-center"
            style={{ backgroundColor: "rgb(0  0 0)" }}
          >
            <img src={logo} alt="Logo CTU" width="60" height="60" />
            <h4 className="text-light mb-0">CTU Market Place</h4>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarButton"
            aria-controls="navbarButton"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-light"></i>
          </button>
          {renderList()}
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userProfile: state.auth.data.userProfile,
  };
};

export default connect(mapStateToProps, {})(Test);
