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
    type: 'text'
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
    type: 'text'
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
    field: 'username',
    headerName: 'Tên đăng nhập',
    width: 300,
    editable: true,
    type: 'text'
  },
  {
    field: 'password',
    headerName: 'Mật khẩu',
    width: 300,
    editable: true,
    type: 'password'
  },
  {
    field: 'confirm_password',
    headerName: 'Xác nhận mật khẩu',
    width: 300,
    editable: true,
    type: 'password'
  },
  {
    field: 'domain',
    headerName: 'Tên miền',
    width: 300,
    editable: true,
    type: 'combobox',
    data: 'domains'
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    width: 300,
    editable: true,
    type: 'combobox',
    data: 'roles'
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
