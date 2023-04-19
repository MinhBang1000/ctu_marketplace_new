
const actionFormatter = ({ value }) => { 
  return (
    <div className="d-flex">{ value }</div>
  )
};

const projectNameFormatter = ({ value }) => { 
  return value.name
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    editable: true,
    type: 'text',
    isDisabled: true, 
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
    type: 'text',
    isDisabled: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 150,
    editable: true,
    type: 'text',
    isDisabled: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    type: 'text',
    isDisabled: true,
  },
  {
    field: 'project',
    isObject: true,
    getBy: 'name',
    headerName: 'Tên dự án',
    width: 450,
    editable: true,
    type: 'text',
    isDisabled: true,
    renderCell: projectNameFormatter,
  },
  {
    field: 'content',
    headerName: 'Nội dung liên hệ',
    width: 450,
    editable: true,
    type: 'textarea',
    isDisabled: true,
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    type: '',
    isDisabled: true,
    renderCell: actionFormatter,
  },

];
