
export const header = [
    { 
        name: 'STT',
        selector: row => row.stt,
        sortable: true,
        width: '100px' 
    },
    { 
        name: 'HỌ TÊN', 
        selector: row => row.fullName, 
        sortable: true 
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
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];
