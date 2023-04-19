import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useAlert } from 'react-alert'

import { createAbout } from '../../../../store/admin.aboutSlice'

import Form from '../../../../components/Form/About'

const MESSAGE_SUCCCESS = 'Thêm thành công'

const AddAbout = (props) => {

    const history = useHistory();
    const alertUseAlert = useAlert()
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(createAbout(data))
        history.push('/admin/abouts')
        alertUseAlert.success(MESSAGE_SUCCCESS)
    }

    return (
        <Form 
            onSubmit={onSubmit} 
            MESSAGE_SUCCCESS={MESSAGE_SUCCCESS}
        />
    )
}


export default AddAbout