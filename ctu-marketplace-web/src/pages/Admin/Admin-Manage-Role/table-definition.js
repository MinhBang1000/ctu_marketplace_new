
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
    isDisabled: true,
    type: 'text', 
  },
  {
    field: 'code',
    headerName: 'MÃ',
    width: 150,
    editable: true,
    maxLength: 10,
    type: 'text',
  },
  {
    field: 'name',
    headerName: 'TÊN',
    width: 450,
    editable: true,
    type: 'text',
  },
  {
    field: 'action',
    headerName: 'HÀNH ĐỘNG',
    width: 150,
    editable: false,
    type: '',
    renderCell: actionFormatter,
  },

];
