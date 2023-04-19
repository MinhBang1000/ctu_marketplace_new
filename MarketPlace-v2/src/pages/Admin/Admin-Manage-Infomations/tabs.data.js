import ManageFields from '../Admin-Manage-Infomations/Admin-Field'
import ManageLevels from '../Admin-Manage-Infomations/Admin-Level'
import AdminTransmisstionMethod from '../Admin-Manage-Infomations/Admin-TransmisstionMethod'
import ManageStatus from '../Admin-Manage-Infomations/Admin-Status'

export const tabs = [
    {
        key: 'home',
        title: 'Thông tin lĩnh vực',
        content: (
           <ManageFields />
        )
    },
    {
        key: 'development-levels',
        title: 'Thông tin mức độ phát triển',
        content: (
            <ManageLevels />
         )
    },
    {
        key: 'transmisstion-methods',
        title: 'Thông tin phương thức chuyển giao',
        content: (
            <AdminTransmisstionMethod />
         )
    },
    {
        key: 'status',
        title: 'Thông tin trạng thái',
        content: (
            <ManageStatus />
         )
    },
]