import FieldsPage from "../../../pages/Admin/Admin-Manage-Infomations/Admin-Field";
import AboutPage from "../../../pages/Admin/Admin-Manage-About";
import SignIn from "../../../pages/Auth/SignIn";

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import DnsIcon from '@mui/icons-material/Dns';
import GroupsIcon from '@mui/icons-material/Groups';
import QuizIcon from '@mui/icons-material/Quiz';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LanguageIcon from '@mui/icons-material/Language';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const dashboardRoutes = {
  QLTT: {
    path: "/informations",
    name: 'Quản lý thông tin',
    icon: "fa fa-info",
    useMaterialIcon: true,
    materialIcon: <LightbulbIcon fontSize="medium"/>,
    component: FieldsPage,
  },
  QLDA: {
    path: "/projects",
    name: 'Quản lý dự án',
    icon: "fas fa-project-diagram",
    component: SignIn,
  },
  QLND: {
    path: "/users",
    name: 'Quản lý người dùng',
    icon: "fas fa-users",
    useMaterialIcon: true,
    materialIcon: <PersonIcon fontSize="medium"/>,
    component: AboutPage,
  },
  QLVT: {
    path: "/roles",
    name: 'Quản lý vai trò',
    icon: "fas fa-user-tag",
    component: SignIn,
  },
  QLDM: {
    path: "/domains",
    name: 'Quản lý domain',
    icon: "fas fa-atom",
    useMaterialIcon: true,
    materialIcon: <DnsIcon fontSize="medium"/>,
    component: AboutPage,
  },
  QLCN: {
    path: "/functions",
    name: 'Quản lý chức năng',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <AdminPanelSettingsIcon fontSize="medium"/>,
    component: SignIn,
  },
  QLNNC: {
    path: "/research-groups",
    name: 'Quản lý nhóm nghiên cứu',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <GroupsIcon fontSize="medium"/>,
    component: AboutPage,
  },
  QLFAQ: {
    path: "/faqs",
    name: 'Quản lý FAQ',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <QuizIcon fontSize="medium"/>,
    component: SignIn,
  },
  QLLH: {
    path: "/contacts",
    name: 'Quản lý liên hệ',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <ContactMailIcon fontSize="medium"/>,
    component: SignIn,
  },
  QLGT: {
    path: "/abouts",
    name: 'Quản lý giới thiệu',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <InfoIcon fontSize="medium"/>,
    component: SignIn,
  },
  QLFT: {
    path: "/footers",
    name: 'Quản lý footer',
    icon: "fas fa-sign-in-alt",
    useMaterialIcon: true,
    materialIcon: <LanguageIcon fontSize="medium"/>,
    component: SignIn,
  },
  QLHV: {
    path: "/home-video",
    name: 'Quản lý home video',
    useMaterialIcon: true,
    materialIcon: <OndemandVideoIcon fontSize="medium"/>,
    component: SignIn,
  },
};

export default dashboardRoutes;