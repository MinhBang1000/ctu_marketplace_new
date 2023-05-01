export const header = [
    // { 
    //     name: 'TEST_ID', 
    //     selector: row => row.id, 
    //     sortable: true,
    //     width: '100px'
    // },
    // { 
    //     name: 'TEST_PROJECTTYPE', 
    //     selector: row => row.projectType, 
    //     sortable: true,
    // },
    { 
        name: 'STT', 
        selector: row => row.stt, 
        sortable: true,
        width: '80px'
    },
    {
        selector: row => row.hightlightAndNumber,
        name: 'NỔI BẬT',
        width: '200px'
    },
    { 
        name: 'TÊN', 
        selector: row => row.name, 
        sortable: true,
        width: 20 
    },
    { 
        name: 'TRẠNG THÁI', 
        selector: row => row.status.name, 
        sortable: true,
        width: '150px'
    },
    { 
        name: 'NGÀY TẠO', 
        selector: row => row.createdDate ? row.createdDate.toLocaleString() : new Date().toLocaleString(), 
        sortable: true,
    },
    { 
        name: 'NGƯỜI TẠO', 
        selector: row => row.user?.fullName, 
        sortable: true,
    },
    { 
        name: 'TÁC GIẢ', 
        selector: row => row.author, 
        sortable: true,
    },
    { 
        name: 'NGƯỜI DUYỆT', 
        selector: row => row.approver?.fullName, 
        sortable: true,
    },
    { 
        name: 'HÀNH ĐỘNG', 
        selector: row => row.action,
        width: '350px'
    },
];
