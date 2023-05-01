import "./index.css";
import MenuItems from './MenuItems';
const Dropdown = ({ submenus, dropdown, depthLevel, handleChangeShowSubmenu }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : 'dropdown-submenu';
  const isLastItems = depthLevel === 3 ? 'last-items' : '';
  return (
    <ul
      className={`dropdown-custom ${dropdownClass} ${
        dropdown ? 'show' : ''
      } ${isLastItems}`}
    >
      {
        submenus && submenus.length > 0
        ? submenus.map((submenu, index) => (
            <MenuItems
            items={submenu}
            key={index}
            depthLevel={depthLevel}
            handleChangeShowSubmenu={handleChangeShowSubmenu}
            />
        ))
        : null
      }
    </ul>
  );
};

export default Dropdown;