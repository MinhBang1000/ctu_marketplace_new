export const header = [
    { 
        name: 'HỌ TÊN', 
        selector: row => row.fullName, 
        sortable: true 
    },
    { 
        name: 'NỘI DUNG', 
        selector: row => row.content, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];