export const header = [
    { 
        name: 'ID', 
        selector: row => row.id, 
        sortable: true, 
        width: '100px'
    },
    { 
        name: 'MÃ', 
        selector: row => row.code, 
        sortable: true 
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