export const fields = {
    generalInfo: {
        companyName: {
            id: 'companyName',
            label: 'Tên đơn vị',
            fieldName: 'companyName',
            type: 'text',
            isRequired: true,
            step: 0
        },
        author: {
            id: 'author',
            label: 'Nhóm tác giả',
            fieldName: 'author',
            type: 'text',
            isRequired: true,
            step: 0
        },
        address: {
            id: 'address',
            label: 'Địa chỉ',
            fieldName: 'address',
            type: 'text',
            isRequired: true,
            step: 0
        },
        phoneNumber: {
            id: 'phoneNumber',
            label: 'Số điện thoại',
            fieldName: 'phoneNumber',
            type: 'text',
            isRequired: true,
            step: 0
        },
        fax: {
            id: 'fax',
            label: 'Fax',
            fieldName: 'fax',
            type: 'text',
            isRequired: false,
            step: 0
        },
        email: {
            id: 'email',
            label: 'Email',
            fieldName: 'email',
            type: 'email',
            isRequired: true,
            step: 0
        },
        website: {
            id: 'website',
            label: 'Website',
            fieldName: 'website',
            type: 'text',
            isRequired: false,
            step: 0
        },
    },
    detail: {
        name: {
            id: 'name',
            label: 'Tên ý tưởng',
            fieldName: 'name',
            type: 'text',
            isRequired: true,
            step: 1
        },
        shortDescription: {
            id: 'shortDescription',
            label: 'Mô tả ngắn',
            fieldName: 'shortDescription',
            type: 'textarea',
            isRequired: true,
            step: 1
        },
        // process: {
        //     id: 'process',
        //     label: 'Mô tả quy trình công nghệ',
        //     fieldName: 'process',
        //     type: 'editor',
        //     isRequired: true
        // },
        projectFieldList: {
            id: 'projectFieldList',
            label: 'Lĩnh vực',
            fieldName: 'projectFieldList',
            type: 'checkboxTreeView',
            isRequired: true,
            step: 1
        },
        description: {
            id: 'description',
            label: 'Chi tiết',
            fieldName: 'description',
            type: 'editor',
            isRequired: true,
            step: 1
        },
        // comDevLevelList: {
        //     id: 'comDevLevelList',
        //     // fakeId: 'developmentLevel',
        //     fakeId: 'devLevel',
        //     label: 'Mức độ phát triển',
        //     fieldName: 'comDevLevelList',
        //     type: 'checkbox',
        //     children: 'levels',
        //     childId: 'developmentLevelId',
        //     isRequired: true
        // },
        // comTransMethodList: {
        //     id: 'comTransMethodList',
        //     // fakeId: 'transmissionMethod',
        //     fakeId: 'transMethod',
        //     label: 'Phương thức chuyển giao',
        //     fieldName: 'comTransMethodList',
        //     type: 'checkbox',
        //     children: 'transmisstions',
        //     childId: 'comTransMethodId',
        //     isRequired: true
        // },
        scope: {
            id: 'scope',
            label: 'Phạm vi ứng dụng',
            fieldName: 'scope',
            type: 'textarea',
            isRequired: true,
            step: 1
        },
        // price: {
        //     id: 'price',
        //     label: 'Chào giá tham khảo',
        //     fieldName: 'price',
        //     type: 'text',
        //     isRequired: false
        // },
        // projectImage: {
        //     id: 'projectImage',
        //     label: 'Hình ảnh tổng thể',
        //     fieldName: 'projectImage',
        //     type: 'image',
        //     isRequired: true
        // },
        
        projectImage: {
            id: 'projectImage',
            label: 'Hình ảnh tổng thể',
            fieldName: 'projectImage',
            type: 'image',
            isRequired: false,
            step: 1
        },
    },
}