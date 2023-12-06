import React, { useEffect, useState } from 'react'

function NAdminManageNavHome() {
    const [modal, openModal] = useState(false)
    const [user, setUser] = useState()
    const [ids, setIds] = useState('')
    const [userEdit, setUserEdit] = useState({
        degree: "",
        position: "",
        current: "",
        organization: "",
        room: "",
        skill: ""
    })


    useEffect(() => {
        fetch('https://6555c93584b36e3a431e55e6.mockapi.io/user')
            .then((res) => res.json())
            .then((resp) => {
                setUser(resp);
                setUserEdit(
                    {
                        degree: resp[0].degree,
                        position: resp[0].position,
                        current: resp[0].current,
                        organization: resp[0].organization,
                        room: resp[0].room,
                        skill: resp[0].skill
                    })
                console.log(resp)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    console.log(userEdit)

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const apiUrl = `https://6555c93584b36e3a431e55e6.mockapi.io/user/${ids}`;

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userEdit),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                openModal(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handSubmit = (id) => {
        openModal(true);
        setIds(id)
        console.log(id)
    };
    return (
        <div className='user_group_container_edit'>
            <div className='user_group_container_profile_edit'>
                <div className='user_group_container_profile_edit_marin'>
                    <div className='user_group_container_profile_edit_box navbar navbar-expand-lg navbar-light' >
                        <div className='user_group_container_profile_edit_header'>
                            <p>Danh Thiếp</p>
                        </div>

                        {
                            user && user.map((item, index) => (

                                <div className='user_group_container_profile_edit_endheader' value={item.id}>
                                    <div className='none'>{index}</div>

                                    <button class="button_edit" onClick={() => handSubmit(item.id)} >Sửa <i class="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            ))
                        }

                    </div>

                    <div className='user_group_container_profile_edit_box_body'>
                        <div className='user_group_container_profile_edit_box_body_item'>
                            <div className='user_group_container_profile_edit_box_body_list'>
                                <div className='user_group_container_profile_edit_box_body_list_header'>

                                    <div className='user_group_container_profile_edit_box_body_list_item'>
                                        {
                                            user && user.map(item => (
                                                <h4>{item.name}</h4>
                                            ))
                                        }
                                        <b>Kĩ năng</b>
                                        {
                                            user && user.map(item => (
                                                <p>{item.skill}</p>
                                            ))
                                        }
                                        <b>Tổ chức</b>
                                        {
                                            user && user.map(item => (
                                                <p>{item.organization}</p>
                                            ))
                                        }
                                        <b>Khoa</b>
                                        {
                                            user && user.map(item => (
                                                <p>{item.room}</p>
                                            ))
                                        }
                                    </div>
                                    <div className='user_group_container_profile_edit_box_body_list_header_avatar'>
                                        <img src='https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg' className='user_avatar'></img>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {
                        modal && <div className='modal'>
                            <div className='modal__overlay'></div>
                            <div className='modal__body'>
                                <div className='author_form'>
                                    <div className='author_form__container'>
                                        <div className='author_form__container_header'>
                                            <h3 className='author_form__container_header_title'>Chỉnh sửa danh thiếp của bạn</h3>
                                            <p className='author_form__container_header_body'>Danh thiếp của bạn là bản tóm tắt hồ sơ của bạn được hiển thị trên ResearchGate. Luôn cập nhật thẻ này để những người khác có thể tìm hiểu về bạn khi họ phát hiện ra thẻ của bạn.</p>
                                        </div>
                                        <div className='author_form__container_body'>
                                            <p className='author_form__container_body_title'>Mọi thay đổi bạn thực hiện ở đây cũng sẽ được cập nhật trong hồ sơ của bạn.</p>
                                            {
                                                user && user.map(item => (
                                                    <h4 className="author_form__container_body_name">{item.name}</h4>
                                                ))
                                            }

                                            <form className='author_form__container_body_form' onSubmit={handleFormSubmit} >

                                                <div className='author_form__container_body_form_box'>
                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Bằng cấp</b>

                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <input
                                                                    className='input_form'
                                                                    placeholder='Nhập bằng cấp'
                                                                    onChange={e => setUserEdit({ ...userEdit, degree: e.target.value })}
                                                                    value={userEdit.degree}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='author_form__container_body_form_box'>

                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Chức vụ</b>
                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <input
                                                                    className='input_form'
                                                                    placeholder='Nhập vị trí'
                                                                    onChange={e => setUserEdit({ ...userEdit, position: e.target.value })}
                                                                    value={userEdit.position}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='author_form__container_body_form_box'>

                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Hoạt động hiện tại</b>
                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <textarea
                                                                    className='textarea_form'
                                                                    placeholder='Bạn đang tìm kiếm cộng tác viên, vị trí mới, phản hồi hoặc điều gì khác?  Nhập hoạt động hiện tại của bạn để cho mọi người biết'
                                                                    maxLength='120'
                                                                    onChange={e => setUserEdit({ ...userEdit, current: e.target.value })}
                                                                    value={userEdit.current}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='author_form__container_body_form_box'>

                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Tổ chức</b>
                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <input
                                                                    className='input_form'
                                                                    placeholder='Nhập tổ chức'
                                                                    onChange={e => setUserEdit({ ...userEdit, organization: e.target.value })}
                                                                    value={userEdit.organization}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='author_form__container_body_form_box'>

                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Phòng</b>
                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <input
                                                                    className='input_form'
                                                                    placeholder='Nhập khoa'
                                                                    onChange={e => setUserEdit({ ...userEdit, room: e.target.value })}
                                                                    value={userEdit.room}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='author_form__container_body_form_box'>

                                                    <div className='author_form__container_body_form_box_marin'>
                                                        <div className='author_form__container_body_form_box_title'>
                                                            <b className='font_size'>Kĩ năng</b>
                                                        </div>
                                                        <div className='author_form__container_body_form_box_input'>
                                                            <div className=''>
                                                                <textarea
                                                                    className='textarea_form'
                                                                    placeholder='Nhập kĩ năng'
                                                                    onChange={e => setUserEdit({ ...userEdit, skill: e.target.value })}
                                                                    value={userEdit.skill}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='author_form_btn_end'>
                                                    <div className='author_form_btn_end_flex'>
                                                        <button className='author_form_btn_end_close'>Hủy bỏ</button>
                                                        <button className='author_form_btn_end_save'>Lưu</button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NAdminManageNavHome