import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert'

import { retrieveFooter, updateFooter } from '../../../../store/admin.footerSlice'

import Form from '../../../../components/Form/Footer'

const MESSAGE_SUCCCESS = 'Chỉnh sửa thành công'

const EditFooter = (props) => {

    const [footer, setFooter] = React.useState(null);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const alertUseAlert = useAlert()

    useEffect(() => {
        dispatch(retrieveFooter(props.match.params.id))
            .then(response => {
                setFooter(response.payload)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data) => {
        dispatch(updateFooter(data))
            .then(() => {
                history.push('/admin/footers')
                alertUseAlert.success(MESSAGE_SUCCCESS)
            })
    }

    const renderFooter = () => {
        if(footer){
            return (
                <Form 
                    onSubmit={onSubmit} 
                    MESSAGE_SUCCCESS={MESSAGE_SUCCCESS}
                    footer={footer}
                />
            )
        }
        return null;
    }

    return (
        <>
            { renderFooter() }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        footer: state.footersAdmin[ownProps.match.params.id],
    };
};

export default connect(
    mapStateToProps,
    {}
)(EditFooter);