import React from "react"
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './NView-Detail.scss'
import nl2br from "react-nl2br";

function NViewDetail() {
    const { id } = useParams();
    const [viewShow, setViewShow] = useState({})
    const [user, setUser] = useState()
    const [publication, setPublication] = useState()

    useEffect(() => {
        fetch(`https://6555c93584b36e3a431e55e6.mockapi.io/group/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setViewShow(resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    })


    useEffect(() => {
        fetch('https://6555c93584b36e3a431e55e6.mockapi.io/user')
            .then((res) => res.json())
            .then((resp) => {
                setUser(resp);
                console.log(resp)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/publication")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setPublication(resp);
                console.log("list group: ", resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    return (
        <div className="container__view" >
            <div className="container__view_group">
                <div className="container__view_group_back">
                    <Link className="button_view" to="/viewgroup/">Trở về</Link>
                </div>

                <div className="container__view_group_box">
                    {
                        viewShow &&
                        <div>
                            <div className="container__view_group_box_name">
                                <h3>{viewShow.name}</h3>
                            </div>
                            <div className="container__view_group_box_item">
                                <h4 className="container__view_group_box_item_h4">1. Trưởng nhóm</h4>
                                <p>{nl2br(viewShow.leader)}</p>
                            </div>
                            <div>
                                <h4 className="container__view_group_box_item_h4">2. Giới Thiệu</h4>
                                <p>{nl2br(viewShow.introduction)}</p>
                            </div>
                            <div>
                                <h4 className="container__view_group_box_item_h4">3. Sứ mệnh và tầm nhìn</h4>
                                <p>{nl2br(viewShow.mission)}</p>
                                <p>{nl2br(viewShow.vision)}</p>
                            </div>
                            <div>
                                <h4 className="container__view_group_box_item_h4">4. Đề Tài</h4>
                                <p>{nl2br(viewShow.topic)}</p>
                            </div>

                        </div>
                    }
                </div>
            </div>

            <div className="view__profile">
                <div className="">
                    <h4 className="container__view_group_box_item_h4">5. Các thành viên hiện tại</h4>
                </div>
                <div className="view__profile_table">

                    <div className='view__profile_table_img'>
                        <img src='https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg' className='user_avatar'></img>
                    </div>
                    <div className="view__profile_table_item">
                        {
                            user && user.map(item => (
                                <div>
                                    <div className="view__profile_table_item_padding">
                                        <h4 className="container__view_group_box_item_h4">Bằng cấp</h4>
                                        <p>{item.degree}</p>
                                    </div>
                                    <div>
                                        <h4 className="container__view_group_box_item_h4">Chức vụ</h4>
                                        <p>{item.position}</p>
                                    </div>
                                    <div>
                                        <h4 className="container__view_group_box_item_h4">Hoạt động hiện tại</h4>
                                        <p>{item.current}</p>
                                    </div>
                                    <div>
                                        <h4 className="container__view_group_box_item_h4">Tổ chức</h4>
                                        <p>{item.organization}</p>
                                    </div>
                                    <div>
                                        <h4 className="container__view_group_box_item_h4">Khoa</h4>
                                        <p>{item.room}</p>
                                    </div>
                                    <div>
                                        <h4 className="container__view_group_box_item_h4">Kĩ năng</h4>
                                        <p>{item.skill}</p>
                                    </div>


                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="publication__view">
                <div className="">
                    <h4 className="container__view_group_box_item_h4">6. Ấn phẩm</h4>
                </div>
            </div>
        </div>
    )
}

export default NViewDetail