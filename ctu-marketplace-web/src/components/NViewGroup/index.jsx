import React from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import './NView-Show.scss'

function NViewGroup () {
    const [groups, setGroups] = useState('')

    const [id,setId] = useState('')
    const history = useHistory()
    useEffect(() => {

        fetch("https://6555c93584b36e3a431e55e6.mockapi.io/group")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setGroups(resp);
                console.log("list group: ", resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])

    const handClick = (id) => {
        history.push({pathname: `/viewdetail/${id}`, state: { fromPopup: true }})
        console.log(id)
    }
    return(
        <div className="container__viewshow">
        <div className="container__viewshow_box">
            <div className="container__viewshow_box_marin">
                <div className="container__viewshow_box_title">
                    <h3 className="container__viewshow_box_title_h3">NHÓM NGHIÊN CỨU</h3>
                </div>
                <div className="container__viewshow_box_body">
                    <table className="container__viewshow_box_table">
                        <thead className="container__viewshow_box_table_head">
                            <tr className="container__viewshow_box_table_tr">
                                <td className="container__viewshow_box_table_td">STT</td>
                                <td className="container__viewshow_box_table_td">Tên Nhóm</td>
                                <td className="container__viewshow_box_table_td">Trưởng Nhóm</td>
                            </tr>
                        </thead>
                        <tbody className="container__viewshow_box_table_body">
                        {
                            groups && groups.map((item, index) => (
                                
                                    <tr className="container__viewshow_box_table_td" key={item.id}>
                                        <td className="container__viewshow_box_table_td" value={id}>{index + 1}</td>
                                        <td className="container__viewshow_box_table_td_a" onClick={() => {handClick(item.id)}}>{item.name}</td>
                                        <td className="container__viewshow_box_table_td">{item.leader}</td>
                                        
                                    </tr>
                               
                            ))
                        }
                         </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
    )
}

export default NViewGroup