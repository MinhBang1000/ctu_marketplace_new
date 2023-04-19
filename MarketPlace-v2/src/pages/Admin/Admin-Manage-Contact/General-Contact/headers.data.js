export const header = [
    { 
        name: 'HỌ TÊN', 
        selector: row => row.fullName, 
        sortable: true 
    },
    { 
        name: 'TIÊU ĐỀ', 
        selector: row => row.title, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];