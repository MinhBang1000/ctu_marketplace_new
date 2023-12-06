import { useState, useEffect } from 'react'
import './NAdmin-Manage-NavPublication.scss'

function NAdminManageNavPublication() {
    const [modal, setModal] = useState(false)
    const [publication, setPublication] = useState(null)
    const [formPublicEdit, setFormPublicEdit] = useState({
        title: "",
        author: "",
        year_of_publication: "",
        jourmal_name: "",
        volume_number: "",
        issue_number: "",
        page_number: "",
        DOI: "",
        id: ""
    })
    const [modalCreate, setModalcreate] = useState(false)

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year_of_publication, setYear_of_publication] = useState('')
    const [jourmal_name, setJourmal_name] = useState('')
    const [volume_number, setVolume_number] = useState('')
    const [issue_number, setIssue_number] = useState('')
    const [page_number, setPage_number] = useState('')
    const [DOI, setDOI] = useState('')



    //lấy dữ liệu về
    useEffect(() => {
        fetch("http://localhost:3000/publication")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setPublication(resp);
                console.log("list group: ", resp);
                setFormPublicEdit({
                    title: resp[0].title,
                    author: resp[0].author,
                    year_of_publication: resp[0].year_of_publication,
                    jourmal_name: resp[0].jourmal_name,
                    volume_number: resp[0].volume_number,
                    issue_number: resp[0].issue_number,
                    page_number: resp[0].page_number,
                    DOI: resp[0].DOI
                });
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
        const formdata = {
            title,
            author,
            year_of_publication,
            jourmal_name,
            volume_number,
            issue_number,
            page_number,
            DOI
        }

        fetch("http://localhost:3000/publication", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formdata)
        })
            .then((res) => {
                alert('Lưu thành công')
                window.location.reload()
                setModalcreate(false)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    //delete vị trí id
    const handDelete = (ids) => {
        if (window.confirm('Bạn có muốn xóa Nhóm ?')) {
            fetch(`http://localhost:3000/publication/${ids}`, {
                method: "DELETE"
            })
                .then((res) => {

                    alert('Xóa Thành Công !')
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    }

    //update lại form
    const handleFormSubmitPub = (e) => {
        e.preventDefault();

        const apiUrl = `http://localhost:3000/publication/${id}`;

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formPublicEdit),
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
    const handEdit = (ids) => {
        setModal(true)
        setId(ids)
        var selectedGroup;
        publication.forEach(element => {
            if (element.id == ids) {
                selectedGroup = element
            }
        });
        setFormPublicEdit({
            title: selectedGroup.title,
            author: selectedGroup.author,
            year_of_publication: selectedGroup.year_of_publication,
            jourmal_name: selectedGroup.jourmal_name,
            volume_number: selectedGroup.volume_number,
            issue_number: selectedGroup.issue_number,
            page_number: selectedGroup.page_number,
            DOI: selectedGroup.DOI

        });
    }
    return (
        <div className='container__publication'>
            <div className='container__publication_box'>
                <div className='container__publication_box_marin'>
                    <div className='container__publication_box_padding'>
                        <button onClick={handSubmitCreate} className='container__publication_box_button_create'>Thêm (+)</button>
                    </div>
                    <div>
                        <table className='container_table'>
                            <thead className='container_headtable'>
                                <tr className='container_headtable_tr'>
                                    <td className='container_headtable_td'>Stt</td>
                                    <td className='container_headtable_td'>Tiêu đề</td>
                                    <td className='container_headtable_td'>Tác Giả</td>
                                    <td className='container_headtable_td'>Năm xuất bản</td>
                                    <td className='container_headtable_td'>Tạp chí</td>
                                    <td className='container_headtable_td'>Số Lượng</td>
                                    <td className='container_headtable_td'>Số phát hành</td>
                                    <td className='container_headtable_td'>Số Trang</td>
                                    <td className='container_headtable_td'>DOT</td>
                                    <td className='container_headtable_td'>Thao tác</td>
                                </tr>
                            </thead>
                            {
                                publication && publication.map((item, index) => (
                                    <tbody className='container_bodytable'>
                                        <tr className='container_bodytable_tr' key={item.id}>
                                            <td className='container_bodytable_td' value={id}>{index + 1}</td>
                                            <td className='container_bodytable_td'>{item.title}</td>
                                            <td className='container_bodytable_td'>{item.author}</td>
                                            <td className='container_bodytable_td'>{item.year_of_publication}</td>
                                            <td className='container_bodytable_td'>{item.jourmal_name}</td>
                                            <td className='container_bodytable_td'>{item.volume_number}</td>
                                            <td className='container_bodytable_td'>{item.issue_number}</td>
                                            <td className='container_bodytable_td'>{item.page_number}</td>
                                            <td className='container_bodytable_td'>{item.DOI}</td>
                                            <td className="container_bodytable_td_button">
                                                <button className="button_pub_edit" onClick={() => handEdit(item.id)}>
                                                    <i class="fa-solid fa-pen-to-square icon__setting"></i>
                                                </button>
                                                <button className="button_pub_delete" onClick={() => { handDelete(item.id) }}>
                                                    <i class="fa-solid fa-trash-can icon__setting"></i>
                                                </button>

                                            </td>
                                        </tr>

                                    </tbody>
                                ))
                            }
                        </table>
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
                                    <h3 className='author_form__container_header_title'>Chỉnh sửa thông tin bài viết của bạn</h3>

                                </div>
                                <div className='author_form__container_body'>
                                    <p className='author_form__container_body_title'>Mọi thay đổi bạn thực hiện ở đây cũng sẽ được cập nhật</p>

                                    <form className='author_form__container_body_form' onSubmit={handleFormSubmitPub} >

                                        <div className='author_form__container_body_form_box'>
                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Tiêu đề</b>

                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập tên tiêu đề'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, title: e.target.value })}
                                                            value={formPublicEdit.title}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Tác giả</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập tên tác giả'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, author: e.target.value })}
                                                            value={formPublicEdit.author}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Năm xuất bản</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập năm'
                                                            maxLength='120'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, year_of_publication: e.target.value })}
                                                            value={formPublicEdit.year_of_publication}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Tạp chí</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập tên Tạp chí'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, jourmal_name: e.target.value })}
                                                            value={formPublicEdit.jourmal_name}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Số lượng</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập Số lượng'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, volume_number: e.target.value })}
                                                            value={formPublicEdit.volume_number}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Số phát hành</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập số phát hành'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, issue_number: e.target.value })}
                                                            value={formPublicEdit.issue_number}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>Số trang</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập Số trang'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, page_number: e.target.value })}
                                                            value={formPublicEdit.page_number}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='author_form__container_body_form_box'>

                                            <div className='author_form__container_body_form_box_marin'>
                                                <div className='author_form__container_body_form_box_title'>
                                                    <b className='font_size'>DOT</b>
                                                </div>
                                                <div className='author_form__container_body_form_box_input'>
                                                    <div className=''>
                                                        <input
                                                            className='input_form'
                                                            placeholder='Nhập DOT'
                                                            onChange={e => setFormPublicEdit({ ...formPublicEdit, DOI: e.target.value })}
                                                            value={formPublicEdit.DOI}
                                                        ></input>
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
            {modalCreate &&
                <div className="form__create_pub">
                    <div className='form__create_pub_overlay'></div>
                    <div className="form__create_pub_body">
                        <form className="form__create_pub_submit" onSubmit={handSubmit}>
                            <div className="form__create_pub_submit_header">
                                <h2 className='form__create_pub_submit_header_item'>Thêm Bài viết</h2>
                            </div>

                            <div className="form__create_pub_submit_body">
                                <div className="form__create_pub_submit_body_box">
                                    <div className="">
                                        <div className="" value={id}>

                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Tiêu đề</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"

                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Tác Giả</h4>
                                            </div>

                                            <div>
                                                <input
                                                    className="input_form_create"
                                                    value={author}
                                                    onChange={e => setAuthor(e.target.value)}
                                                ></input>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Năm xuất bản</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"
                                                    value={year_of_publication}
                                                    onChange={e => setYear_of_publication(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin ">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Tạp chí</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"

                                                    value={jourmal_name}
                                                    onChange={e => setJourmal_name(e.target.value)}
                                                ></input>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Số lượng</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"

                                                    value={volume_number}
                                                    onChange={e => setVolume_number(e.target.value)}
                                                ></input>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Số phát hành</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"
                                                    value={issue_number}
                                                    onChange={e => setIssue_number(e.target.value)}
                                                ></input>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>Số trang</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"
                                                    value={page_number}
                                                    onChange={e => setPage_number(e.target.value)}
                                                ></input>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form__create_pub_submit_body_item">
                                        <div className="form__create_pub_submit_body_item_marin">
                                            <div>
                                                <h4 className='form__create_pub_submit_body_item_h4'>POT</h4>
                                            </div>
                                            <div>
                                                <input
                                                    className="input_form_create"

                                                    value={DOI}
                                                    onChange={e => setDOI(e.target.value)}
                                                ></input>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="form__create_pub_submit_body_button">
                                        <div className="form__create_pub_submit_body_button_marin">
                                            <button className='form__create_pub_submit_body_button_back' onClick={() => setModalcreate(false)}>Trở về</button>
                                            <button className='form__create_pub_submit_body_button_save' type='submit'>Lưu</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            }
        </div>
    )
}

export default NAdminManageNavPublication