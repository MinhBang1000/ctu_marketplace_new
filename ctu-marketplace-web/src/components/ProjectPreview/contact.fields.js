// const fieldFormatter = ({ value }) => { 
//   return <span style={{textTransform: 'uppercase'}}>{value ? value.name : ''}</span> 
// };
// const actionFormatter = ({ value }) => { 
//   return (
//     <div className="flex">{ value }</div>
//   )
// };
// projectId;
// fullName;
// phoneNumber;
// email;
// content;
export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    type: 'text' ,
    isShow: false,
  },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    width: 450,
    editable: true,
    type: 'text',
    isDisabled: true,
    isShow: true,
  },
  {
    field: 'fullName',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
    required: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    width: 150,
    editable: true,
    type: 'text',
    isShow: true,
    required: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    type: 'email',
    isShow: true,
    required: true,
  },
  {
    field: 'content',
    headerName: 'Nội dung liên hệ',
    width: 150,
    editable: true,
    type: 'textarea',
    required: true,
    isShow: true,
    // renderCell: actionFormatter,
  },

];
