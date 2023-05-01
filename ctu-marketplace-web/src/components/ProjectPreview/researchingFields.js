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
            icon: 'fa fa-fax'
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
            icon: 'fa fa-globe'
        },
        price: {
            id: 'price',
            label: 'Chào giá tham khảo',
            fieldName: 'price',
            type: 'text',
            isRequired: false,
            icon: 'fa fa-dollar-sign'
        },
    },
    content: {
        // name: {
        //     id: 'name',
        //     label: 'Tên giải pháp, sản phẩm',
        //     fieldName: 'name',
        //     type: 'text',
        //     isRequired: true,
        //     showInDetailPage: false
        // },
        challenge: {
            id: 'challenge',
            label: 'Thách thức',
            fieldName: 'challenge',
            type: 'editor',
            isRequired: true,
        },
        solution: {
            id: 'solution',
            label: 'Cách giải quyết',
            fieldName: 'solution',
            type: 'editor',
            isRequired: true
        },
        benefit: {
            id: 'benefit',
            label: 'Lợi ích',
            fieldName: 'benefit',
            type: 'editor',
            isRequired: true
        },
        projectImage: {
            id: 'projectImage',
            label: 'Hình ảnh tổng thể',
            fieldName: 'projectImage',
            type: 'image',
            isRequired: true,
        },
    },
}