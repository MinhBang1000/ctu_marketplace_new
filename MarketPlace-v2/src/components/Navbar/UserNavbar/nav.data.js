export const data = [
    {
        name: 'Home',
        path: '/',
        children: []
    },
    {
        name: 'Projects',
        path: '/projects',
        children: [
            {
                name: 'Commercial-Projects',
                path: '/san-pham/thuong-mai',
                children: [],
                typeOfProject: 'commercial'
            },
            {
                name: 'Researching-Projects',
                path: '/san-pham/nghien-cuu',
                children: [],
                typeOfProject: 'researching'
            },
            {
                name: 'Idea-Projects',
                path: '/san-pham/y-tuong',
                children: [],
                typeOfProject: 'idea'
            },
            
        ]
    },
    {
        name: 'Research-groups',
        path: '/nhom-nghien-cuu',
        children: []
    },
    // {
    //     name: 'Nổi bật',
    //     path: '/hightlights',
    //     children: []
    // },
    {
        name: 'FAQ',
        path: '/faqs',
        children: []
    },
    {
        name: 'About',
        path: '/gioi-thieu',
        children: []
    },
    {
        name: 'Contact',
        path: '/lien-he',
        children: []
    },
]