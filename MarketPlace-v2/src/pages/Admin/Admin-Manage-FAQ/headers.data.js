export const header = [
    { 
        name: 'ID', 
        selector: row => row.id, 
        sortable: true,
        width: '100px'  
    },
    { 
        name: 'CÂU HỎI', 
        selector: row => row.question, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];