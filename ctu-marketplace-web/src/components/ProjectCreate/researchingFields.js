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
            label: 'Tên nghiên cứu',
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
        challenge: {
            id: 'challenge',
            label: 'Thách thức',
            fieldName: 'challenge',
            type: 'editor',
            isRequired: true,
            step: 1
        },
        solution: {
            id: 'solution',
            label: 'Cách giải quyết',
            fieldName: 'solution',
            type: 'editor',
            isRequired: true,
            step: 1
        },
        benefit: {
            id: 'benefit',
            label: 'Lợi ích',
            fieldName: 'benefit',
            type: 'editor',
            isRequired: true,
            step: 1
        },
        projectFieldList: {
            id: 'projectFieldList',
            label: 'Lĩnh vực',
            fieldName: 'projectFieldList',
            type: 'checkboxTreeView',
            isRequired: true,
            step: 1
        },
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