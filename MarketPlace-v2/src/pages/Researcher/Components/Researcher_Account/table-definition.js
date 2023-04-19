const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

export const columns = [
  // { 
  //   field: 'id', 
  //   headerName: 'ID', 
  //   width: 90 
  // },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 300,
    editable: true,
    isShow: true,
    type: 'text'
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    isShow: true,
    type: 'text'
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 300,
    editable: true,
    isShow: true,
    type: 'text'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
    isShow: true,
    type: 'text'
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    isShow: true,
    renderCell: genderFormatter,
    type: 'combobox'
  },
  {
    field: 'dob',
    headerName: 'Ngày sinh',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'date'
  },
  {
    field: 'bio',
    headerName: 'Tiểu sử',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'editor'
  },
  {
    field: 'qualification',
    headerName: 'Trình độ chuyên môn',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'text'
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 150,
    editable: true,
    isShow: true,
    // renderCell: genderFormatter,
    type: 'text'
  },
  {
    field: 'domain',
    headerName: 'Tên miền',
    width: 150,
    editable: false,
    isShow: true,
    data: 'domains',
    // renderCell: actionFormatter,
    type: 'combobox'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    isShow: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];

// private String fullName;
//     private String avatar;
//     private String email;
//     private String phoneNumber;
//     private String address;
//     private String dob;
//     private String bio;
//     private String website;
//     private String qualification;
//     private Integer gender;
//     private Long domainId;
//     private String username;
