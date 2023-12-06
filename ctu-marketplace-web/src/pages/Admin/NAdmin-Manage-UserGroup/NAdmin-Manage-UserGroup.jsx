import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NAdminManageUserGroup.scss'
import NAdminManageNavHome from "../NAdmin-Manage-NavUser/NAdmin-Manage-NavHome";
import NAdminManageNavPublication from "../NAdmin-Manage-NavUser/NAdmin-Manage-NavPublication";


function NAdminManageUserGroup() {
    const [user, setUser] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    let render = null;

    if (currentPage === 1) {
        render = <NAdminManageNavHome />
    } else if (currentPage === 2) {
        render = <NAdminManageNavPublication />
    }


    useEffect(() => {
        fetch('https://6555c93584b36e3a431e55e6.mockapi.io/user')
            .then((res) => res.json())
            .then((resp) => {
                setUser(resp);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    return (
        <div className="user_group">
            <div className='user_group_container'>
                <div className='user_group_container_profile'>
                    <div className='user_group_container_profile_header'>
                        <div className='user_group_container_profile_header_item'>
                            <div className='user_group_container_profile_header_detail'>
                                <div className='user_group_container_profile_header_detail_item'>
                                    <img src='https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg' className='user_avatar'></img>
                                </div>
                                <div className='user_group_container_profile_header_reading'>
                                    {
                                        user && user.map(item => (
                                            <h2>{item.name}</h2>
                                        ))

                                    }
                                    {
                                        user && user.map(item => (
                                            <i>Bằng cấp: {item.degree} - Chức vụ: {item.position} - Đại Học Cần Thơ</i>
                                        ))
                                    }
                                    <p>Việt Nam | Trang Mạng</p>
                                    <i>Hoạt động hiện tại</i>
                                    {
                                        user && user.map(item => (
                                            <p>{item.current}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="user_group_container_profile_navbar">
                        <div className='user_group_container_profile_navbar_box navbar navbar-expand-lg navbar-light'>
                            <div className='user_group_container_profile_navbar_item container-fluid'>
                                <nav>
                                    <ul className='navbar-nav'>
                                        <li className='nav-item' onClick={() => setCurrentPage(1)}>
                                            <div className="nav-link click__nav">Hồ sơ</div>
                                        </li>

                                        <li className='nav-item' onClick={() => setCurrentPage(2)}>
                                            <div className="nav-link click__nav">Bài viết</div>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {render}
        </div>
    )
}





export default NAdminManageUserGroup