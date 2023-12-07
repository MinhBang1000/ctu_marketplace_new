import React, { useEffect, useState } from "react";
import './NAdmin-Manage-NavInvitation.scss';

function NAdminManageNavInvitation() {
    const [invitationList, setInvitationList] = useState(
        [
            {
                groupName: 'Nhóm nghiên cứu 1',
                leader: 'Nguyễn Văn A'
            },
            {
                groupName: 'Nhóm nghiên cứu 1',
                leader: 'Nguyễn Văn A'
            },
            {
                groupName: 'Nhóm nghiên cứu 1',
                leader: 'Nguyễn Văn A'
            }
        ]
    );

    const [userList, setUserList] = useState(
        [
            {
                userName: 'Nguyễn Văn A',
                leader: 'Nguyễn Văn A'
            },
            {
                userName: 'Nguyễn Văn A',
                leader: 'Nguyễn Văn A'
            },
            {
                userName: 'Nguyễn Văn A',
                leader: 'Nguyễn Văn A'
            }
        ]
    );

    const [response, setResponse] = useState();

    useEffect(() => {

    }, []);

    const responseInvitation = (value) => {
        console.log(value);
    }

    const senRequest = (info) => {

    }

    const removeRequest = (info) => {
        
    }

    return <>
        {/* <div className="invitation-list">
            <div className="invitation-list__table">
                <table>
                    <tr>
                        <th class="group-name">Tên nhóm</th>
                        <th class="leader">Trưởng nhóm</th>
                        <th class="action">Thao tác</th>
                    </tr>
                    {
                        invitationList.map((item, index) => {
                            return <>
                                 <tr>
                                    <td>{ item.groupName }</td>
                                    <td>{ item.leader }</td>
                                    <td class="action">
                                        <div className="action__decline" onClick={ () => responseInvitation(false)}>
                                            Từ chối
                                        </div>
                                        <div className="action__acceptance" onClick={ () => responseInvitation(true)}>
                                            Chấp nhận
                                        </div>
                                    </td>
                                </tr>
                            </>
                        })
                    }
                </table>
            </div>
        </div> */}
        <div className="user-list">
           <div className="virtual">
                <div className="user-list__group-name">
                    Nhóm nghiên cứu 123
                </div>
                <div className="user-list__pending-invitation">
                    <div className="user-list__pending-invitation__title">
                        Danh sách lời mời đã gởi
                    </div>
                    <div className="user-list__pending-invitation__list">
                        <table>
                        {
                            userList.map((item, index) => {
                                return <tr>
                                    <td className="user-name">{ item.userName }</td>
                                    <td class="action">
                                        <div className="action__cancel">
                                            Hủy lời mời
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        </table>
                    </div>
                </div>
                <div className="user-list__yet-invitation">
                    <div className="user-list__yet-invitation__title">
                        Nhà nghiên cứu
                    </div>
                    <div className="user-list__yet-invitation__list">
                    <table>
                        {
                            userList.map((item, index) => {
                                return <tr>
                                    <td className="user-name">{ item.userName }</td>
                                    <td class="action">
                                        <div className="action__invitation">
                                            Gửi lời mời
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        </table>
                    </div>
                </div>
           </div>
        </div>
    </>

}

export default NAdminManageNavInvitation