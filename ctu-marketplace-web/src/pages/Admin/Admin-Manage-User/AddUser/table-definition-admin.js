const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
};
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
  
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 300,
    editable: true,
    type: 'text',
    required: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    type: 'email',
    required: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 300,
    editable: true,
    type: 'text',
    required: true,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
    type: 'text',
    required: true,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    renderCell: genderFormatter,
    type: 'combobox'
  },
  {
    field: 'domainId',
    headerName: 'Tên miền',
    width: 300,
    editable: true,
    type: 'combobox',
    data: 'domains',
    parent: 'domain'
  },
  {
    field: 'username',
    headerName: 'Tên đăng nhập',
    width: 300,
    editable: true,
    type: 'text',
    required: true,
    minLength: 8
  },
  {
    field: 'password',
    headerName: 'Mật khẩu',
    width: 300,
    editable: true,
    type: 'password',
    required: true,
    minLength: 8
  },
  {
    field: 'avatar',
    headerName: 'Hình đại diện',
    width: 300,
    editable: true,
    type: 'image'
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];
