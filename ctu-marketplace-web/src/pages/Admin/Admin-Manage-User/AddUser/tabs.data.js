import FormUser from './Form'
import { columns as columnsResearcherUser } from './table-definition-researcherUser'
import { columns as columnsAdminUser } from './table-definition-admin'
import { TYPE_ADMIN, TYPE_NNC } from '../user.type'

export const tabs = [
    {
        key: '/users/add/researcher',
        title: 'Nhà nghiên cứu',
        content: (
            <FormUser name={'researcher'} columns={columnsResearcherUser} userType={TYPE_NNC} />
        )
    },
    {
        key: '/users/add/admin',
        title: 'Quản trị viên',
        content: (
            <FormUser name={'admin'} columns={columnsAdminUser} userType={TYPE_ADMIN} />
         )
    },
    
]