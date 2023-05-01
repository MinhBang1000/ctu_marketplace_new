/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';

import Datatable from 'react-bs-datatable';
import { header } from '../headers.data';

import { retrieveAbouts } from '../../../../store/admin.aboutSlice';

const AdminAbout = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveAbouts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const renderRows = (rows) => {
        if(rows && rows.data){
            return Object.values(rows.data).map((row,index) => {
                const action = (
                    <div key={index}>
                        <Link to={`/admin/abouts/edit/${row.id}`}>
                            <EditIcon color="warning" />
                        </Link>
                    </div>
                )
                return {...row, action: action}
            })
        }
        return null
    }

    return (
        
        <div className="mt-4 container">
            <Link 
                to={'/admin/abouts/new'}
                className="px-4 py-2 mb-2 text-white bg-success rounded-2"
            >
                <ControlPointIcon />
            </Link>
            <div className="h-2"></div>
            
            <Datatable 
                tableHeaders={header} 
                tableBody={renderRows(props.abouts ? props.abouts : [])} 
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        abouts: state.aboutsAdmin,
    };
}

export default connect(
    mapStateToProps, 
    {}
)(AdminAbout);
