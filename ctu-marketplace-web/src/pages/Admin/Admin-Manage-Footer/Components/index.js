// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom'
// import { connect, useDispatch } from "react-redux";

// // import Datatable from 'react-bs-datatable';
// import DataTable from 'react-data-table-component';

// import EditIcon from '@mui/icons-material/Edit';

// import { header } from '../headers.data'

// import { retrieveFooter } from '../../../../store/admin.footerSlice';

// const AdminFooter = (props) => {

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(retrieveFooter(1))
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
    
//     const renderRows = (rows) => {
//         if(rows && rows.data){
//             return Object.values(rows.data).map(row => {
//                 const action = (
//                     <div className="">
//                         <Link to={`/admin/footers/edit/${row.id}`}>
//                             <EditIcon color="warning" />
//                         </Link>
//                     </div>
//                 )
//                 return {...row, action: action}
//             })
//         }
//         return null
//     }

//     return (
        
//         <div className="mt-4 container">
//             <Datatable 
//                 tableHeaders={header} 
//                 tableBody={renderRows(props.footers ? props.footers : [])} 
//             />
//             {/* <DataTable 
//                 title={`Quản lý`}
//                 columns={header} 
//                 data={renderRows(formData ? formData : [])} 
//                 selectableRows 
//                 pagination
//                 fixedHeader
//                 fixedHeaderScrollHeight="500px" 
//                 conditionalRowStyles={ conditionalRowStyles }
//                 paginationPerPage={ currentSelectedRowPerPage }
//                 progressPending={ loading }
//                 onChangeRowsPerPage={ handlePerRowsChange }
//             /> */}
//         </div>
//     )
// }

// const mapStateToProps = (state) => {
//     return { 
//         footers: state.footersAdmin,
//     };
// }

// export default connect(
//     mapStateToProps, 
//     {}
// )(AdminFooter);
