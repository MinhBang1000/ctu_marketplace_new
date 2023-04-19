import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { fields } from './fields.normal_user';

import { createNormalUser } from '../../../store/userSlice';

import FormUser from './Components/FormUser';

const SignupNormalUser = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e, value) => {
        e.preventDefault();
        dispatch(createNormalUser(value))
            .then(() => {
                history.push('/dang-nhap')
            });
    }

    return (
        <FormUser fields={fields} onSubmit={onSubmit} name="guest" />
    )
}

export default SignupNormalUser;