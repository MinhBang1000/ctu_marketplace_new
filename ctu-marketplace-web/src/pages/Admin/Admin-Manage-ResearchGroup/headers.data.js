export const header = [
    { 
        name: 'ID', 
        selector: row => row.id, 
        sortable: true,
        width: '100px'  
    },
    { 
        name: 'TÊN NHÓM', 
        selector: row => row.groupName, 
        sortable: true 
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action, 
    },
];