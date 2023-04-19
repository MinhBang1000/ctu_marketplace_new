import { Dropdown } from 'react-bootstrap'
import { useTranslation } from "react-i18next";

const customDropDown = (props) => {
    const { data, onDropdownSelect } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation('common');

    const renderList = () => {
        if(data && data.length > 0){
            return data.map((item, index) => {
                const { title, templateNumber } = item;
    
                return (
                    <Dropdown.Item key={index} onClick={() => onDropdownSelect(templateNumber)}>
                        { title }
                    </Dropdown.Item>
                )
            })
        }

        return null;
    }

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {t(`researcher.project-create.project-types.${`commercial`}`)
            ? t(`researcher.project-create.project-types.${`commercial`}`)
            : t("researcher.project-create.dropdown-select-type")}
        </Dropdown.Toggle>

        <Dropdown.Menu>{renderList()}</Dropdown.Menu>
      </Dropdown>
    );
}

export default customDropDown;