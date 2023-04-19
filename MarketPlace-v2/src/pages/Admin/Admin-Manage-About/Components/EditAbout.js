import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'

import { retrieveAbout, updateAbout } from '../../../../store/admin.aboutSlice'

import Form from '../../../../components/Form/About'

const MESSAGE_SUCCCESS = 'Chỉnh sửa thành công'

const EditAbout = (props) => {

    const [about, setAbout] = React.useState(null);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const alertUseAlert = useAlert()

    useEffect(() => {
        dispatch(retrieveAbout(props.match.params.id))
            .then(response => {
                setAbout(response.payload)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data) => {
        dispatch(updateAbout(data))
            .then(() => {
                history.push('/admin/abouts')
                alertUseAlert.success(MESSAGE_SUCCCESS)
            })
    }

    const renderAbout = () => {
        if(about){
            return (
                <Form 
                    onSubmit={onSubmit} 
                    MESSAGE_SUCCCESS={MESSAGE_SUCCCESS}
                    about={about}
                />
            )
        }
        return null;
    }

    return (
        <>
            { renderAbout() }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        about: state.abouts[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    {}
)(EditAbout);