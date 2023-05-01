import GeneralContact from './General-Contact'
import CustomerContact from './Customer-Contact'

export const tabs = [
    {
        key: '/admin/contacts/contact',
        title: 'Liên hệ chung',
        content: (
            <GeneralContact />
        )
    },
    {
        key: '/admin/contacts/customer-contact',
        title: 'Liên hệ khách hàng',
        content: (
            <CustomerContact />
         )
    },
    
]