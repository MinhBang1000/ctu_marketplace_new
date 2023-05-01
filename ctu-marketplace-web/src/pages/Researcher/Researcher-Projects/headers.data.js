export const header = [
    { 
        name: 'ID', 
        selector: row => row.id, 
        sortable: true 
    },
    { 
        name: 'TRẠNG THÁI', 
        selector: row => row.code, 
        sortable: true,
        cell: row => row?.status?.name, 
    },
    { 
        name: 'TÊN', 
        selector: row => row.name, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];