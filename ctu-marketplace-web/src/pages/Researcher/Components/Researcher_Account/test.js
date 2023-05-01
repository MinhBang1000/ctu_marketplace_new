import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.png';

// import { columns as columnsField, rows as rowsField} from '../Admin-Manage-Infomation/table-data-field';


import AppsIcon from '@material-ui/icons/Apps';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import DnsIcon from '@mui/icons-material/Dns';
import FunctionsIcon from '@mui/icons-material/Functions';
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller';

const navItems = [
    {
        className: 'nav-items--active',
        icon: <HomeIcon />,
        name: 'Account',
        path: '',
       
    },
    {
        className: 'nav-items',
        icon: <AppsIcon />,
        name: 'Password',
        path: '/projects',
    },
    {
        className: 'nav-items',
        icon: <InfoIcon />,
        name: 'Quản lý người dùng',
        path: '/users',
    },
    {
        className: 'nav-items',
        icon: <ImagesearchRollerIcon />,
        name: 'Security',
        path: '/roles',
    },
    {
        className: 'nav-items',
        icon: <DnsIcon />,
        name: 'Application',
        path: '/domains',
    },
    {
        className: 'nav-items',
        icon: <FunctionsIcon />,
        name: 'Notification',
        path: '/functions',
    },
   
]

const AdminHeader = () => {

    const renderNavItems = (items) => {
        return items.map((item, index) => {
            return (
                <Link 
                    to={`/admin${item.path}`}
                    className="flex items-center gap-2 p-4 border-t-2 border-gray-500"
                    key={index}
                >
                    <section className="text-sm">{ item.icon }</section>
                    <section className="text-sm">{ item.name }</section>
                </Link>
            )
        })
    }

    return (
        <div 
                className="z-20 flex-col h-screen text-white transition duration-200 transform admin-background sm:relative sm:translate-x-0 sidebar md:w-1/4 bg-blue-primary sm:flex" 
                id="navContainer"
            >
                <Link 
                    to="/" 
                    className="relative flex flex-col items-center justify-center mt-4"
                >
                    <img 
                        alt="logo"
                        src={logo}
                        className="w-20"
                    />
                    <div className="flex justify-center mt-2">
                        <p className="text-xl font-semibold tracking-tighter uppercase">
                            ctu market place
                        </p>
                        <div 
                            className="absolute h-4 bg-blue-500 opacity-75 w-1/2 md:w-1/2 mx-auto -bottom-0.5 rounded-sm" 
                            style={{ zIndex: "-10" }}>

                        </div> 
                    </div>
                </Link>
                <div className="flex flex-col h-screen mx-2 mt-14">
                    { renderNavItems(navItems) }
                </div>
            </div>
        
    )
}

export default AdminHeader;