import AboutPage from "../../../pages/Admin/Admin-Manage-About";
import SignIn from "../../../pages/Auth/SignIn";

const dashboardRoutes = [
  {
    path: "/abouts",
    name: 'Quản lý thông tin',
    icon: "fa fa-info",
    component: AboutPage,
  },
  {
    path: "/projects/commercial",
    name: 'Quản lý dự án',
    icon: "fas fa-project-diagram",
    component: SignIn,
  },
  {
    path: "/abouts",
    name: 'Quản lý người dùng',
    icon: "fas fa-users",
    component: AboutPage,
  },
  {
    path: "/login",
    name: 'Quản lý vai trò',
    icon: "fas fa-user-tag",
    component: SignIn,
  },
  {
    path: "/abouts",
    name: 'Quản lý domain',
    icon: "fas fa-atom",
    component: AboutPage,
  },
  {
    path: "/login",
    name: 'Quản lý chức năng',
    icon: "fas fa-sign-in-alt",
    component: SignIn,
  },
  {
    path: "/abouts",
    name: 'Quản lý nhóm nghiên cứu',
    icon: "fas fa-address-card",
    component: AboutPage,
  },
  {
    path: "/login",
    name: 'Quản lý FAQ',
    icon: "fas fa-sign-in-alt",
    component: SignIn,
  },
  {
    path: "/login",
    name: 'Quản lý liên hệ',
    icon: "fas fa-sign-in-alt",
    component: SignIn,
  },
  {
    path: "/login",
    name: 'Quản lý dự án',
    icon: "fas fa-sign-in-alt",
    component: SignIn,
  },
  {
    path: "/login",
    name: 'Quản lý giới thiệu',
    icon: "fas fa-sign-in-alt",
    component: SignIn,
  },
];

export default dashboardRoutes;