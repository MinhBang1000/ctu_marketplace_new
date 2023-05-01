// const categoryFormatter = ({ value }) => { 
//   return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
// };
const actionFormatter = ({ value }) => { 
  return (
    <div className="flex my-1">{ value }</div>
  )
};

export const columns = [
  {
    field: 'actionAdd',
    headerName: ' ',
    width: 80,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 100,
    editable: true,
    type: 'text'
  },
  // // {
  // //   field: 'code',
  // //   headerName: 'Mã',
  // //   width: 150,
  // //   editable: true,
  // //   type: 'text'
  // },
  {
    field: 'name',
    headerName: 'TÊN',
    width: 550,
    editable: true,
    type: 'text'
  },
  // {
  //   field: 'category',
  //   headerName: 'Thể loại',
  //   width: 250,
  //   editable: true,
  //   renderCell: categoryFormatter,
  //   type: 'combobox'
  // },
  {
    field: 'actions',
    headerName: 'HÀNH ĐỘNG',
    width: 150,
    editable: false,
    renderCell: actionFormatter,
    type: 'text'
  },

];
