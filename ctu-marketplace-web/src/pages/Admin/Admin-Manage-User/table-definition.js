
const genderFormatter = ({ value }) => { 
  return <span style={{fontStyle: 'italic'}}>{value === 0 ? 'Nam' : 'Nữ'}</span> 
};
const actionFormatter = ({ value }) => {
  return (
    <div className="flex">{ value }</div>
  )
};
const statusFormatter = ({ value }) => { 
return (
  <div className={`bg-${value ? (value === true ? 'green' : 'red') : 'yellow'}-500 rounded-3 text-center w-full mx-4 text-white`}>
      { value ? (value === true ? 'Đã kích hoạt' : 'Chưa kích hoạt') : 'Chưa kích hoạt' }
    </div>
)
};
const roleFormatter = ({ value }) => { 
  return (
    <div className="italic">
      { value ? value.name : '' }
    </div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    type: 'text', 
  },
  {
    field: 'isEnabled',
    headerName: 'Trạng thái',
    width: 150,
    editable: true,
    type: 'text',
    renderCell: statusFormatter,
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    width: 150,
    editable: true,
    type: 'combobox',
    renderCell: roleFormatter,
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
    type: 'text',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    type: 'text',
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
    type: 'text',
    renderCell: genderFormatter,
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    type: '',
    renderCell: actionFormatter,
  },

];
