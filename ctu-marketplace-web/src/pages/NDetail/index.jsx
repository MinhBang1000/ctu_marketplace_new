import React, { useContext } from "react"
import clsx from "clsx"
import styles from "./NDetail.module.css"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import { StoreProvider } from "../../store/globalstate"
import {Link} from "react-router-dom"

const NDetail = (props) => {
    const {id} = props.match.params 
    const initState = { projectDetail: null }
    const [localState, setState] = useState(initState)
    const {projectDetail} = localState

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/v3/projects/${id}`)
        .then((res) => {
            setState((prev) => {
                return {...prev, projectDetail: res.data.data}
            })
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Xem chi tiết dự án",
                text: "Không tìm thấy dự án này! Vui lòng kiểm tra lại"
            })
            console.log(err);
        })
    }, [])

    const detailComponent = (project) => {
        return (
            <div className={clsx(styles.detail)}>
            <h1 className={clsx(styles.detailTitle)}>{project.name}</h1>
            <h3 className={clsx(styles.detailAuthor)}>{project.author}</h3>
            <ul className={clsx(styles.detailFields)}>
                {
                    project.fields.map((item, index) => {
                        return (
                            <Link
                                to={`/?field=${item.id}`}
                            >
                                <li key={index} className={clsx(styles.detailItem)}>{item.name}</li>
                            </Link>
                        )
                    })
                }
            </ul>
            {
                project.keyValues.map((item,index) => {
                    return (<div key={index} className={clsx(styles.detailKeyValues)}>
                        <div>{item.key}</div>
                        <div
                            dangerouslySetInnerHTML={{__html: item.value}}
                        ></div>
                    </div>)
                })
            }
        </div>
        )
    }

    return (<div className={clsx(styles.detailWrapper)}>
        {
            projectDetail !== null ? detailComponent(projectDetail) : ""
        }
    </div>)
}

export default NDetail