import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { fields } from './fields.researcher_user';

import { createResearcher } from '../../../store/userSlice';

import FormUser from './Components/FormUser';

const ROLE_NNC_ID = 103;

const initValue = {
    domainId: 101,
    roleId: ROLE_NNC_ID,
    isEnabled: false,
    gender: 0
}

const SignupResearcher = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e, value) => {
        e.preventDefault();
        dispatch(createResearcher(value))
            .then(() => {
                history.push('/dang-nhap')
            });
    }

    return (
        <FormUser initValue={initValue} fields={fields} onSubmit={onSubmit} name="researcher" />
    )
}

export default SignupResearcher;