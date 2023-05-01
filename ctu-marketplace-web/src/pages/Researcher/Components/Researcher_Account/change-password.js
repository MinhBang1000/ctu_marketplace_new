import React from 'react';

import { useTranslation } from 'react-i18next';

const ChangePassword = (props) => {

    const { t } = useTranslation('common');

    const { 
        isDisable,
        handleChange

    } = props;

    return (
        <div className='form-group'>
            <input 
                className='form-control'
                type={'password'}
                placeholder={ t(`researcher.home.form.password`) }
                disabled={isDisable}
                onChange={(e) => handleChange('password', e.target.value)}
            />
        </div>
    )
}

export default ChangePassword;