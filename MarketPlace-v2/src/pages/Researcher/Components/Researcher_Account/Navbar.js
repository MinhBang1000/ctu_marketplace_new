import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BiotechIcon from '@mui/icons-material/Biotech';
import Avatar from '@mui/material/Avatar';

import { useTranslation } from 'react-i18next';
import logo from '../../../../assets/logo.png';
import { ROUTE_NNC_CREATE_PROJECT, ROUTE_NNC_PROJECTS } from '../../../../components/Router/constants';




const AdminHeader = (props) => {

    const { t } = useTranslation('common');

    const navItems = [
        {
            className: 'nav-items--active',
            icon: (
                <AddCircleOutlineIcon fontSize="large" />
            ),
            name: t('researcher.home.navbar.create-project'),
            path: ROUTE_NNC_CREATE_PROJECT,
           
        },
        {
            className: 'nav-items',
            icon: (
                <BiotechIcon fontSize="large" />
            ),
            name: t('researcher.home.navbar.projects'),
            path: ROUTE_NNC_PROJECTS,
        },
    ]

    const renderNavItems = (items) => {
        return items.map((item, index) => {
            return (
                <Link 
                    to={`${item.path}`}
                    className="d-flex align-items-center gap-2 p-2"
                    key={index}
                >
                    <div className='nav-researcher-icon'>{ item.icon }</div>
                    <h4 className='nav-reseacher-name text-uppercase'>{ item.name }</h4>
                </Link>
            )
        })
    }

    const { fullName, avatar } = props.user

    return (
        <div 
            id="navContainer"
        >
            <Link 
                to="#" 
                className="d-flex flex-column align-items-center justify-content-center mt-4"
            >
                <Avatar
                    alt={avatar ? avatar : logo}
                    src={avatar ? avatar : logo}
                    sx={{ width: 150, height: 150 }}
                />
                <h5 className="align-items-center mt-3">
                    { fullName ? fullName : '' }
                </h5>  
            </Link>
            <div className="d-flex flex-column h-100 mx-2 mt-3 align-items-center">
                { renderNavItems(navItems) }
            </div>
        </div>
    )
}

export default AdminHeader;