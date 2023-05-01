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
        scope: {
            id: 'scope',
            label: 'Phạm vi thương mại',
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
        comDevLevelList: {
            id: 'comDevLevelList',
            label: 'Mức độ phát triển',
            fieldName: 'comDevLevelList',
            type: 'checkbox',
            children: 'levels',
            isRequired: true,
            // childId: 'devLevel',
            childId: 'developmentLevelId',
            icon: 'fas fa-chart-line'
        },
        comTransMethodList: {
            id: 'comTransMethodList',
            label: 'Phương thức chuyển giao',
            fieldName: 'comTransMethodList',
            type: 'checkbox',
            children: 'transmisstions',
            isRequired: true,
            // childId: 'transMethod',
            childId: 'transMethodId',
            icon: 'fa fa-handshake'
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
        //     showInDetailPage: false,
        //     icon: 'fa fa-home'
        // },
        process: {
            id: 'process',
            label: 'Mô tả quy trình công nghệ',
            fieldName: 'process',
            type: 'editor',
            isRequired: true,
            // icon: 'fa fa-home'
        },
        advantage: {
            id: 'advantage',
            label: 'Ưu điểm',
            fieldName: 'advantage',
            type: 'editor',
            isRequired: true,
            // icon: 'fa fa-home'
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