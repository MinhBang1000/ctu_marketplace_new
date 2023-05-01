
export const header = [
    { 
        name: 'STT',
        selector: row => row.id,
        sortable: true,
        width: '100px' 
    },
    { 
        name: 'HỌ TÊN', 
        selector: row => row.fullName, 
        sortable: true 
    },
    { 
        name: 'KÍCH HOẠT', 
        selector: row => row.enabled, 
        sortable: true,
        width: '150px' 
    },
    { 
        name: 'TÊN ĐĂNG NHẬP', 
        selector: row => row.username, 
        sortable: true 
    },
    { 
        name: 'EMAIL', 
        selector: row => row.email, 
        sortable: true 
    },
    { 
        name: 'VAI TRÒ', 
        selector: row => row?.role?.name, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];
