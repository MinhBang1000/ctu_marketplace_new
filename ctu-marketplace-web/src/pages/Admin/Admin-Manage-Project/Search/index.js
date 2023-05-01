import { useTranslation } from "react-i18next";

const FilterComponent = ({ filterText, onFilter, onClear, filterBy }) => {

    const { t } = useTranslation('common');

    return (
        <>
            <div className='form-group'>
                <input
                    id="search"
                    type="text"
                    placeholder={`${t(`admin.search.filterBy.${filterBy}`)}`}
                    value={filterText}
                    onChange={onFilter}
                    className={`form-control`}
                />
                
            </div>
            <button type="button" onClick={onClear} className='btn btn-primary rounded-3'>
                X
            </button>
        </>
    )
};

export default FilterComponent;