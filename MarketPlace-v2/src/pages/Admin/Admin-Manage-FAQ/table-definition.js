
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
    type: 'text', 
  },
  {
    field: 'question',
    headerName: 'CÂU HỎI',
    width: 150,
    editable: true,
    type: 'text',
  },
  {
    field: 'answer',
    headerName: 'CÂU TRẢ LỜI',
    width: 450,
    editable: true,
    type: 'textarea',
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
