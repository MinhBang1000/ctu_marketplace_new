import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ArrowBack from '../../../components/ArrowBack';

import { retrieveResearchGroup } from '../../../store/researchGroupSlice';
import { Link } from 'react-router-dom';

const MemberDetail = (props) => {

    const [member, setMember] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const { groupId, memberId } = props.match.params;

        dispatch(retrieveResearchGroup(groupId))
        .then(res => {
            // console.log(res.payload.groupDetailList)
            setMember(res.payload.groupDetailList.find(
                member => (member.userProfile?.id?.toString() === memberId || member.id.toString() === memberId)
            ));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderComponent = () => {
        if(member){
            const avatar = member.userProfile?.avatar ? member.userProfile.avatar : (member.avatar ? member.avatar : 'https://via.placeholder.com/150');
            const fullName = member.userProfile?.fullName ? member.userProfile.fullName : (member.fullName ? member.fullName : null);
            const qualification = member.userProfile?.qualification ? member.userProfile.qualification : (member.qualification ? member.qualification : null);
            const bio = member.userProfile?.bio ? member.userProfile.bio : (member.bio ? member.bio : null);
            const introduction = member.userProfile?.introduction ? member.userProfile.introduction : (member.introduction ? member.introduction : null);
            const address = member.userProfile?.address ? member.userProfile.address : (member.address ? member.address : null);
            const phoneNumber = member.userProfile?.phoneNumber ? member.userProfile.phoneNumber : (member.phoneNumber ? member.phoneNumber : null);
            const email = member.userProfile?.email ? member.userProfile.email : (member.email ? member.email : null);
            const website = member.userProfile?.website ? member.userProfile.website : (member.website ? member.website : null);

            return (
                <div className='container mt-4'>
                    <div>
                        <ArrowBack />
                    </div>
                    <div className='row mt-3'>
                                <div className="col-md-4">
                                    <img
                                        style={{width:"100%", height:"100%", objectFit: 'contain'}}
                                        src={avatar}
                                        alt={avatar}
                                        className="rounded-3"
                                    />
                                </div>
                                <div className='col-md-1'></div>
                                <div className='col-md-7'>
                                    <h1 className='mb-3 mt-3' style={{textAlign:'center'}}>
                                            { fullName }
                                    </h1>
                                    <h5 className='mb-2'>
                                        { qualification }
                                    </h5>
                                    <div className='mb-2'>
                                        <b>Email: </b> { email }
                                    </div>
                                    <div className='mb-2'> 
                                        <b>Điện thoại: </b>{ phoneNumber }
                                    </div>
                                    <div className='mb-2'>
                                        <b>Địa chỉ: </b>  { address }
                                    </div>
                                    <div className='mb-2'>
                                    <b>Website: </b>
                                        <Link 
                                            to={{ pathname: `https://${website}` }}
                                            target="_blank"
                                            className='text-primary'
                                        >
                                            { website }
                                        </Link>
                                    </div>
                                    <div className='mt-3' 
                                        dangerouslySetInnerHTML={{ __html: bio }}
                                    />
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: introduction }}
                                    />
                                    
                                </div>
                            </div>
                        </div>
            )
        }

        return <div>Member detail</div>
    }

    return (
        <>
            { renderComponent() }
        </>
    )
}

export default MemberDetail;