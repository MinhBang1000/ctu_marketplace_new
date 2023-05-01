const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value ? 'Nam' : 'Nu'}</span> 
};
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex">{ value }</div>
  )
};

export const columns = [
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 300,
    editable: true,
    type: 'text',
    required: true
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300,
    editable: true,
    type: 'email',
    required: true
  },
  {
    field: 'dob',
    headerName: 'Ngày sinh',
    width: 150,
    editable: true,
    isShow: true,
    type: 'date',
    required: false
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 300,
    editable: true,
    type: 'text',
    required: false
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 300,
    editable: true,
    type: 'text',
    required: false
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    renderCell: genderFormatter,
    type: 'combobox',
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
    isShow: true,
    type: 'password',
    required: true,
    minLength: 8
  },
  {
    field: 'qualification',
    headerName: 'Trình độ chuyên môn',
    width: 150,
    editable: true,
    isShow: true,
    type: 'text',
    required: false
  },
  {
    field: 'website',
    headerName: 'Website',
    width: 300,
    editable: true,
    type: 'text',
    required: false
  },
  {
    field: 'bio',
    headerName: 'Tiểu sử',
    width: 150,
    editable: true,
    isShow: true,
    required: false,
    type: 'editor',
  },
  {
    field: 'domainId',
    headerName: 'Tên miền',
    width: 300,
    editable: true,
    type: 'combobox',
    data: 'domains',
    parent: 'domain',
  },
  {
    field: 'avatar',
    headerName: 'Hình đại diện',
    width: 300,
    editable: true,
    type: 'image',
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
  },

];
