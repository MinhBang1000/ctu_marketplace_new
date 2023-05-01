
const actionFormatter = ({ value }) => { 
  return (
    <div className="d-flex">{ value }</div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    editable: true,
    type: 'text', 
  },
  {
    field: 'code',
    headerName: 'Mã',
    width: 150,
    editable: true,
    type: 'text',
  },
  {
    field: 'groupName',
    headerName: 'Tên',
    width: 450,
    editable: true,
    type: 'text',
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
