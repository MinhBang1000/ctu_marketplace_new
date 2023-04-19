// const genderFormatter = ({ value }) => { 
//   return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
// };
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

// private String fullName;
// private String avatar;
// private String email;
// private String phoneNumber;
// private String address;
// private Boolean getNews;
// private Integer gender;
// private String username;

export const columns = [
  // { 
  //   field: 'id', 
  //   headerName: 'ID', 
  //   width: 90 
  // },
  {
    field: 'groupName',
    headerName: 'Tên nhóm',
    width: 300,
    editable: true,
    isShow: true,
    type: 'text'
  },
  {
    field: 'shortDescription',
    headerName: 'Mô tả ngắn',
    width: 300,
    editable: true,
    isShow: true,
    type: 'textarea'
  },
  {
    field: 'introduction',
    headerName: 'Giới thiệu',
    width: 300,
    editable: true,
    isShow: true,
    type: 'editor'
  },
  {
    field: 'researchTopic',
    headerName: 'Chủ đề nghiên cứu',
    width: 300,
    editable: true,
    isShow: true,
    type: 'editor'
  },
  {
    field: 'publication',
    headerName: 'Công bố khoa học',
    width: 300,
    editable: true,
    isShow: true,
    type: 'editor'
  },
  {
    field: 'groupImage',
    headerName: 'Hình đại diện',
    width: 300,
    editable: true,
    isShow: true,
    type: 'image'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    isShow: true,
    renderCell: actionFormatter,
    type: 'text'
  },

];
