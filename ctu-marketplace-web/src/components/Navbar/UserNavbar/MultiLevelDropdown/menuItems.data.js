export const menuItems = [
  {
    name: 'development',
    path: 'web-dev',
    children: [
      {
        name: 'Frontend',
        path: 'frontend',
      },
      {
        name: 'Backend',
        children: [
          {
            name: 'NodeJS',
            path: 'node',
          },
          {
            name: 'PHP',
            path: 'php',
          },
        ],
      },
    ],
  },
];