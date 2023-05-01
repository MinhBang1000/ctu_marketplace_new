export const fields = {
    navbar: {
        companyName: {
            id: 'companyName',
            label: 'Tên đơn vị',
            fieldName: 'companyName',
            type: 'text',
            isRequired: true,
            icon: 'fa fa-home'
        },
        author: {
            id: 'author',
            label: 'Nhóm tác giả',
            fieldName: 'author',
            type: 'text',
            isRequired: true,
            icon: 'fa fa-users'
        },
        address: {
            id: 'address',
            label: 'Địa chỉ',
            fieldName: 'address',
            type: 'text',
            isRequired: true,
            icon: 'fa fa-map-marker'
        },
        phoneNumber: {
            id: 'phoneNumber',
            label: 'Số điện thoại',
            fieldName: 'phoneNumber',
            type: 'text',
            isRequired: true,
            icon: 'fa fa-phone'
        },
        fax: {
            id: 'fax',
            label: 'Fax',
            fieldName: 'fax',
            type: 'text',
            isRequired: false,
            icon: 'fa fa-home'
        },
        email: {
            id: 'email',
            label: 'Email',
            fieldName: 'email',
            type: 'email',
            isRequired: true,
            icon: 'fa fa-envelope'
        },
        website: {
            id: 'website',
            label: 'Website',
            fieldName: 'website',
            type: 'text',
            isRequired: false,
            icon: 'fa fa-home'
        },
        scope: {
            id: 'scope',
            label: 'Phạm vi ứng dụng',
            fieldName: 'scope',
            type: 'text',
            isRequired: true,
            icon: 'fa fa-flag'
        },
        projectFieldList: {
            id: 'projectFieldList',
            label: 'Lĩnh vực',
            fieldName: 'projectFieldList',
            type: 'checkboxTreeView',
            isRequired: true,
            icon: 'fa fa-microscope'
        },
    },
    content: {
        description: {
            id: 'description',
            label: 'Chi tiết',
            fieldName: 'description',
            type: 'editor',
            isRequired: true,
            icon: 'fa fa-home'
        },
        projectImage: {
            id: 'projectImage',
            label: 'Hình ảnh tổng thể',
            fieldName: 'projectImage',
            type: 'image',
            isRequired: true,
            icon: 'fa fa-home'
        },
    },
}