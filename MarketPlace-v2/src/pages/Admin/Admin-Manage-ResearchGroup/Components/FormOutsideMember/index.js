import environment from '../../../../../environments/environment';

import axios from 'axios';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { DropzoneArea } from 'material-ui-dropzone';
import ArrowBack from '../../../../../components/ArrowBack';
import CKEditor from '../../../../../components/CKEditor/CKEditor4';

import logo from '../../../../../assets/logo.png';
import Combobox from '../../Combobox';

const EditUser = (props) => {

    const [member, setMember] = useState(props.member);

    const handleOutsiteMemberChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setMember(previousState => ({...previousState, [name]: value }))
    }   

    const onRoleChange = (roleId) => {
        setMember(previousState => ({...previousState, roleOfGroupId: roleId }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const copyMember = {...member};
        setMember(null)
        
        props.handleSubmit(e, copyMember)
        
    }

    const onImageChange = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("upload", files[0]);

        axios.post(environment.url.java + '/upload-file', formData, config)
            .then(response => {
                const imgSrc = response.data.url;

                if (response.data) {
                    setMember(previousState => ({...previousState, avatar: imgSrc }))
                } else {
                    return alert('failed to upload file')
                }
            })
}

    const renderAvatarField = () => {
        return (
            <div className="form-group">
                 <section>{ 'Ảnh đại diện' }</section>
                 <DropzoneArea
                     acceptedFiles={['image/*']}
                     dropzoneText={"Drag and drop an image here or click"}
                     onChange={onImageChange}
                     initialFiles={
                     [ member 
                         ? member.avatar 
                         : logo
                     ]}
                 />
            </div>
         )
    }

    const handleCKEditorChange = (event, editor) => {
        const name = event.editor.name;
        const data = event.editor.getData();
        setMember(previousState => ({...previousState, [name]: data }))
    }

    const renderOutsiteMember = () => {
        return (
            <>
                <form 
                    className='row gap-3' 
                    id="add-other-member"
                    onSubmit={e => handleSubmit(e)}
                >
                    <div className='form-group'>
                        <label htmlFor='fullName' className='form-label'>Họ tên</label>
                        <input 
                            name="fullName"
                            defaultValue={member ? member.fullName : ''}
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => handleOutsiteMemberChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input 
                            name={'email'}
                            defaultValue={member ? member.email : ''}
                            type="email"
                            className="form-control"
                            email={`${member && member.email ? true : false}`}
                            required
                            onChange={(e) => handleOutsiteMemberChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='website' className='form-label'>Website</label>
                        <input 
                            name="website"
                            defaultValue={member ? member.website : ''}
                            type="text"
                            className="form-control"
                            onChange={(e) => handleOutsiteMemberChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='qualification' className='form-label'>Trình độ chuyên môn</label>
                        <input 
                            name="qualification"
                            defaultValue={member ? member.qualification : ''}
                            type="text"
                            className="form-control"
                            onChange={(e) => handleOutsiteMemberChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bio' className='form-label'>Thông tin giới thiệu</label>
                        <CKEditor 
                            field={
                                {
                                    id: 'bio',
                                    name: 'bio',
                                    fieldName: 'bio'
                                }
                            }
                            initData={member ? member.bio : ''}
                            onChange={handleCKEditorChange}
                        />
                    </div>
                    <div>
                        { renderAvatarField() }
                    </div>
                    <div className='form-group'>
                        <Combobox 
                            data={props.rolesOfGroup} 
                            selectedIndex={
                                member 
                                ? { label: member?.roleOfGroup?.name, value: member?.roleOfGroup?.id} 
                                : { label: props?.rolesOfGroup[0]?.name, value: props?.rolesOfGroup[0]?.id }} 
                            onChecked={onRoleChange}
                            label="Chọn vai trò của thành viên" 
                        />
                    </div>
                    <div className=''>
                        <button 
                            className={`btn rounded-3 ${props.type === 'add' ? 'btn-success' : 'btn-warning'}`}
                            type='submit'
                        >
                            { props.btnText }
                        </button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <>
            <ArrowBack />
            <div className="container">    
                <div className="mb-4 text-center">
                    <h4>CHỈNH SỬA THÔNG TIN THÀNH VIÊN</h4>
                </div>
                <div className='row'>
                    <div className="mt-2">
                        { renderOutsiteMember() }
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        
    };
  };
  
  export default connect(
    mapStateToProps,
    {}
  )(EditUser);

  