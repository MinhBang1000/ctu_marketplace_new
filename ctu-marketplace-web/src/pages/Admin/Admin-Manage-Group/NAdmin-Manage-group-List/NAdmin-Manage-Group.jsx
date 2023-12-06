import './NAdmin-Manage-Group.scss'
import { useEffect, useState } from "react"
import nl2br from "react-nl2br"
import React from "react"
import axios from 'axios'

function NAdminManageGroup() {
    const [groups, setGroups] = useState(null)
    const [id, setId] = useState('')
    const [modal, setModal] = useState(false)
    const [modalcreate, setModalcreate] = useState(false)
    const [selectedGroupId, setSelectedGroupId] = useState();
    const [view, setView] = useState({})
   

    const [name, setName] = useState('');
    const [leader, setLeader] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [mission, setMission] = useState('')
    const [vision, setVision] = useState('')
    const [topic, setTopic] = useState('')

    const [formGroupEdit, setFormGroupEdit] = useState({
        name: "",
        leader: "",
        introduction: "",
        mission: "",
        topic: "",
        vision: "",
        id: ""
    })

    const api = 'https://127.0.0.1:3001/api/v3'

    useEffect(() => {
        axios.get(`${api}/strong-groups`)
            .then((res) => {
                console.log("group list: ", res)
                // return res.json();
            })
            .then((resp) => {
                setGroups(resp);
                console.log("list group: ", resp);
                setFormGroupEdit({
                    name: resp[0].name,
                    leader: resp[0].leader,
                    introduction: resp[0].introduction,
                    mission: resp[0].mission,
                    topic: resp[0].topic,
                    vision: resp[0].vision,
                })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])


    const handSubmitCreate = () => {
        setModalcreate(true)
    }

    const handSubmit = (e) => {

        e.preventDefault()
        const formdata = { name, leader, introduction, mission, vision, topic }

        fetch("https://6555c93584b36e3a431e55e6.mockapi.io/group", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formdata)
        })
            .then((res) => {
                alert('Lưu thành công')
                window.location.reload()
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        fetch(`https://6555c93584b36e3a431e55e6.mockapi.io/group/${selectedGroupId}`)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setView(resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    })

    const handDeleteGroup = (ids) => {
        if (window.confirm('Bạn có muốn xóa Nhóm ?')) {
            fetch(`https://6555c93584b36e3a431e55e6.mockapi.io/group/${ids}`, {
                method: "DELETE"
            })
                .then((res) => {

                    alert('Xóa Thành Công !')

                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const apiUrl = `https://6555c93584b36e3a431e55e6.mockapi.io/group/${id}`;

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formGroupEdit),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setModal(false)
                window.location.reload()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    //bắt sự kiện click chuột edit
    const handEditGroup = (ids) => {
        setModal(true)
        setId(ids)
        var selectedGroup;
        groups.forEach(element => {
            if (element.id == ids) {
                selectedGroup = element
            }
        });
        setFormGroupEdit({
            name: selectedGroup.name,
            leader: selectedGroup.leader,
            introduction: selectedGroup.introduction,
            mission: selectedGroup.mission,
            topic: selectedGroup.topic,
            vision: selectedGroup.vision,
        });
    }

    return (
        <>
            <div className="container__listgroup">
                {
                    selectedGroupId ? (<>

                        <div className="detailed-form-container">
                            {
                                view &&
                                <div>
                                    <button onClick={() => setSelectedGroupId(false)} className="button_back_detail">Trở về</button>
                                    <div className='detailed-form-container__title'>
                                        <h3>{nl2br(view.name)}</h3>
                                    </div>
                                    <div>
                                        <h4 className="detailed-form-container__item_h4">1. Trưởng nhóm:</h4>
                                        <p className='detailed-form-container__p'>{nl2br(view.leader)}</p>
                                    </div>
                                    <div>
                                        <h4 className="detailed-form-container__item_h4">2. Giới Thiệu:</h4>
                                        <p className='detailed-form-container__p'>{nl2br(view.introduction)}</p>
                                    </div>
                                    <div>
                                        <h4 className="detailed-form-container__item_h4">3. Sứ mệnh:</h4>
                                        <p className='detailed-form-container__p'>{nl2br(view.mission)}</p>
                                    </div>
                                    <div>
                                        <h4 className="detailed-form-container__item_h4">4. Tầm nhìn:</h4>
                                        <p className='detailed-form-container__p'>{nl2br(view.vision)}</p>
                                    </div>
                                    <div>
                                        <h4 className="detailed-form-container__item_h4">5. Đề Tài:</h4>
                                        <p className='detailed-form-container__p'>{nl2br(view.topic)}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </>) :
                        <div className="container__listgroup_box">
                            <div className="container__listgroup_title">
                                <h2 className="container__listgroup_title_h2">Danh Sách các nhóm quản lý mạnh</h2>
                            </div>

                            <div className="">
                                <div className="">
                                    <button className="button__submit_create" onClick={handSubmitCreate}>Thêm Nhóm(+)</button>

                                </div>
                                <table className="table_form_listgroup">
                                    <thead className="table_form_listgroup_thead">
                                        <tr>
                                            <td className="table_form_listgroup_td">STT</td>
                                            <td className="table_form_listgroup_td">Tên Nhóm</td>
                                            <td className="table_form_listgroup_td">Trưởng nhóm</td>
                                            <td className="table_form_listgroup_td">Xử lí</td>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {groups && groups.map((item, index) => (
                                            <tr key={item.id} className="table_form_listgroup_tbody_tr">
                                                <td value={id} className="table_form_listgroup_td">{index + 1}</td>
                                                <td onClick={() => setSelectedGroupId(item.id)} className="table_form_listgroup_td_name">{item.name}</td>
                                                <td className="table_form_listgroup_td">{item.leader}</td>
                                                <td className="">
                                                    <button className="button_list_edit" onClick={() => handEditGroup(item.id)}>
                                                        <i class="fa-solid fa-pen-to-square icon__setting"></i>
                                                    </button>

                                                    <button className="button_list_delete" onClick={() => { handDeleteGroup(item.id) }}>
                                                        <i class="fa-solid fa-trash-can icon__setting"></i>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }
                {
                    modal && <div className='modal'>
                        <div className='modal__overlay'></div>
                        <div className='modal__body'>
                            <div className='author_form'>
                                <div className='author_form__container'>
                                    <div className='author_form__container_header'>
                                        <h3 className='author_form__container_header_title'>Chỉnh sửa thông tin nhóm của bạn</h3>

                                    </div>
                                    <div className='author_form__container_body'>
                                        <p className='author_form__container_body_title'>Mọi thay đổi của bạn thực hiện ở đây cũng sẽ được cập nhật</p>

                                        <form className='author_form__container_body_form' onSubmit={handleFormSubmit} >

                                            <div className='author_form__container_body_form_box'>
                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Tên nhóm</b>

                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <input
                                                                className='input_form'
                                                                placeholder='Nhập tên tiêu đề'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, name: e.target.value })}
                                                                value={formGroupEdit.name}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='author_form__container_body_form_box'>
                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Trưởng nhóm</b>
                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <input
                                                                className='input_form'
                                                                placeholder='Nhập tên tác giả'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, leader: e.target.value })}
                                                                value={formGroupEdit.leader}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='author_form__container_body_form_box'>

                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Giới thiệu</b>
                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <textarea
                                                                className='textarea_form'
                                                                placeholder='Nhập giới thiệu'
                                                                maxLength='120'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, introduction: e.target.value })}
                                                                value={formGroupEdit.introduction}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='author_form__container_body_form_box'>

                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Sứ mệnh</b>
                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <textarea
                                                                className='textarea_form'
                                                                placeholder='Nhập sứ mệnh'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, mission: e.target.value })}
                                                                value={formGroupEdit.mission}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='author_form__container_body_form_box'>

                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Tầm nhìn</b>
                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <textarea
                                                                className='textarea_form'
                                                                placeholder='Nhập tầm nhìn'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, topic: e.target.value })}
                                                                value={formGroupEdit.topic}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='author_form__container_body_form_box'>

                                                <div className='author_form__container_body_form_box_marin'>
                                                    <div className='author_form__container_body_form_box_title'>
                                                        <b className='font_size'>Đề tài</b>
                                                    </div>
                                                    <div className='author_form__container_body_form_box_input'>
                                                        <div className=''>
                                                            <textarea
                                                                className='textarea_form'
                                                                placeholder='Nhập đề tài của nhóm'
                                                                onChange={e => setFormGroupEdit({ ...formGroupEdit, vision: e.target.value })}
                                                                value={formGroupEdit.vision}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='author_form_btn_end'>
                                                <div className='author_form_btn_end_flex'>
                                                    <button className='author_form_btn_end_close' onClick={() => setModal(false)}>Hủy bỏ</button>
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
                {modalcreate &&
                    <div className="modal__create">
                        <div className='modal__overlay_create'></div>
                        <div className="modal__body_create">
                            <div className='author_form_create'>
                                <div className='author_form_container_create'>
                                    <div className='author_form_create_title'>
                                        <h2 className='author_form_create_h2'>Thêm Mục Nhóm</h2>
                                    </div>
                                    <form className="author_form_create_body" onSubmit={handSubmit}>

                                        <div className="">
                                            <div className="">
                                                <div className="">
                                                    <div className="" value={id}>

                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className="">
                                                        <div><b
                                                            className='font_size'>Tên Nhóm</b></div>
                                                        <div>
                                                            <input
                                                                className="input_form_create"
                                                                required
                                                                value={name}
                                                                onChange={e => setName(e.target.value)}
                                                            ></input>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className="">
                                                        <div>
                                                            <b className='font_size'>Trưởng nhóm</b>
                                                        </div>
                                                        <div>
                                                            <input
                                                                className="input_form_create"
                                                                required
                                                                value={leader}
                                                                onChange={e => setLeader(e.target.value)}
                                                            ></input>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className="">
                                                        <div>
                                                            <b className='font_size'>Giới Thiệu</b>
                                                        </div>
                                                        <div> <textarea
                                                            className="textarea_form_create"
                                                            value={introduction}
                                                            onChange={e => setIntroduction(e.target.value)}
                                                        ></textarea>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className="">
                                                        <div>  <b className='font_size'>Sứ mệnh</b></div>
                                                        <div> <textarea
                                                            className="textarea_form_create"
                                                            required
                                                            value={mission}
                                                            onChange={e => setMission(e.target.value)}
                                                        ></textarea></div>

                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className=" ">
                                                        <div>  <b className='font_size'>Tầm nhìn</b></div>
                                                        <div> <textarea
                                                            className="textarea_form_create"

                                                            value={vision}
                                                            onChange={e => setVision(e.target.value)}
                                                        ></textarea>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="author_form_create_body_marin">
                                                    <div className="">
                                                        <div>  <b className='font_size'>Đề Tài</b></div>
                                                        <div> <textarea
                                                            className="textarea_form_create"

                                                            value={topic}
                                                            onChange={e => setTopic(e.target.value)}
                                                        ></textarea>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="author_form_btn_end">
                                                    <div className="author_form_btn_end_flex">
                                                        <button className='author_form_btn_end_close' onClick={() => setModalcreate(false)}>Trở về</button>
                                                        <button className='author_form_btn_end_save' type='submit'>Lưu</button>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                }



            </div>


        </>

    )
}

export default NAdminManageGroup