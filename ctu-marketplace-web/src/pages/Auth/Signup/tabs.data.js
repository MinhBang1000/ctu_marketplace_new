import CreateNormalUser from './normalUser'
import CreateResearcherUser from './researcherUser'

export const tabs = [
    {
        key: '/users/add/normal_user',
        title: 'Người dùng khách',
        content: (
            <CreateNormalUser />
        )
    },
    {
        key: '/users/add/researcher',
        title: 'Nhà nghiên cứu',
        content: (
            <CreateResearcherUser />
        )
    },
    
    
]