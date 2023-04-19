import "./index.css";
import MenuItems from './MenuItems';
import { menuItems as defaultMenuItems } from './menuItems.data';

const MultiLevelDropdown = ({ initialMenuItems, handleChangeShowSubmenu }) => {

  if(initialMenuItems && initialMenuItems?.length > 0){
    return (
        <ul className="menus">
          {initialMenuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                handleChangeShowSubmenu={handleChangeShowSubmenu}
              />
            );
          })}
        </ul>
    );
  }

  return (
      <ul className="menus nav-area">
        {defaultMenuItems.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
              handleChangeShowSubmenu={handleChangeShowSubmenu}
            />
          );
        })}
      </ul>
  );
};

export default MultiLevelDropdown;