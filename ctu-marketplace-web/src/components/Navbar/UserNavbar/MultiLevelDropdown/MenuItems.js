import { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';

import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setFilterProjectField } from '../../../../store/filterProjectFieldSlice';

const MenuItems = ({ items, depthLevel, handleChangeShowSubmenu }) => {
  const [dropdown, setDropdown] = useState(false);

  const history = useHistory();
  let ref = useRef();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  const onBtnFieldOfProjectClick = (e, projectField, typeOfProject) => {
    e.preventDefault();
    setDropdown((prev) => !prev)

    if(projectField?.id?.toString()?.length === 1){
      const level2 = _.find(projectField?.childOfFieldList, function (x) { return x.id.toString().length === 3 })
      const level3 = _.find(level2?.childOfFieldList, function (x) { return x.id.toString().length === 5 })
      projectField = level3;
    }
    if(projectField?.id?.toString()?.length === 3){
      if(projectField.childOfFieldList.length > 0){
        const level3 = _.find(projectField.childOfFieldList, function (x) { return x.id.toString().length === 5 })
        projectField = level3;
      }
    }

    dispatch(setFilterProjectField(projectField))

    let pathname = "";
    if("commercial" === typeOfProject){
      pathname = '/san-pham/thuong-mai';
    }
    if("researching" === typeOfProject){
      pathname = '/san-pham/nghien-cuu';
    }
    if("idea" === typeOfProject){
      pathname = '/san-pham/y-tuong';
    }

    history.push({
      pathname,
      state: {
        projectField,
        isFilterOneField: true
      },
    })
  }

  const onBtnTypeOfProjectClick = (e, typeOfProject) => {
    e.preventDefault();
    setDropdown((prev) => !prev)

    let path = "";
    if("commercial" === typeOfProject){
      path = "/san-pham/thuong-mai";
    }
    if("researching" === typeOfProject){
      path = "/san-pham/nghien-cuu";
    }
    if("idea" === typeOfProject){
      path = "/san-pham/y-tuong";
    }
    history.push(path)
  }
  
  const onParentClick = (e, typeOfProject) => {
    e.preventDefault();
    setDropdown((prev) => !prev)

    let path = "";
    if("commercial" === typeOfProject){
      path = "/san-pham/thuong-mai";
    }
    if("researching" === typeOfProject){
      path = "/san-pham/nghien-cuu";
    }
    if("idea" === typeOfProject){
      path = "/san-pham/y-tuong";
    }
    history.push(path)
  }

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.path && ((items.children && items.children?.length > 0) || (items.childOfFieldList && items.childOfFieldList?.length > 0)) ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
          >
            {
              window.innerWidth < 960 && depthLevel === 0 
              ? (
                items.name
              ) 
              : 
              "Projects" === items.name 
              ? (
                <Link className='nav-link' to={"#"}>{items?.useTranslate ? items.translatedText : items.name}</Link>
              )
              : (
                items.typeOfProject === "commercial" || items.typeOfProject === "researching" || items.typeOfProject === "idea"
                ? (
                  items.isParent ? 
                  (
                    <button 
                      onClick={(e) => onBtnTypeOfProjectClick(e, items.typeOfProject)} 
                      className='nav-link-dropdown-custom'
                      onMouseEnter={(e) => handleChangeShowSubmenu(items.typeOfProject, true, e)}
                    >
                        {items?.useTranslate ? items.translatedText : items.name}
                    </button>
                  )
                  : (
                    <button 
                      onClick={(e) => onParentClick(e, items.typeOfProject)} 
                      className='nav-link-dropdown-custom'
                      onMouseEnter={(e) => handleChangeShowSubmenu(items.typeOfProject, true, e)}
                    >
                        {items?.useTranslate ? items.translatedText : items.name}
                    </button>
                  )
                )
            
                : (
                  <button 
                    onClick={(e) => onBtnFieldOfProjectClick(e, items, items.typeOfProject)} 
                    className='nav-link-dropdown-custom'
                  >
                      {items?.useTranslate ? items.translatedText : items.name}
                  </button>
                )
              )
            }

            {
              depthLevel > 0 && window.innerWidth < 960 
              ? null
              : depthLevel > 0 && window.innerWidth > 960 
                ?(
                  <span>&raquo;</span>
                ) 
                : (
                  <span className="arrow" />
                )
            }
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={(items.children || items.childOfFieldList)}
            dropdown={dropdown}
            handleChangeShowSubmenu={handleChangeShowSubmenu}
          />
        </>
      ) : !items.path && (items.children || (items.childOfFieldList && items.childOfFieldList?.length > 0)) ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={(e) => onBtnFieldOfProjectClick(e, items, items.typeOfProject)}
          >
            <button 
              onClick={(e) => onBtnFieldOfProjectClick(e, items, items.typeOfProject)} 
              className='nav-link-dropdown-custom'
            >
                {items.name}{' '}
            </button>
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.children || items.childOfFieldList}
            dropdown={dropdown}
          />
        </>
      ) : (
        <button 
          onClick={(e) => onBtnFieldOfProjectClick(e, items, items.typeOfProject)}
        >
          <button className='nav-link-dropdown-custom' >
            {items?.useTranslate ? items.translatedText : items.name}
          </button>
        </button>
      )}
    </li>
  );
};

export default MenuItems;