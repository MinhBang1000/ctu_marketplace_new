import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTE_NNC_CREATE_PROJECT, ROUTE_NNC_EDIT_PROJECT, ROUTE_NNC_PROJECTS, ROUTE_PREFIX_NNC } from './constants';

import Loading from '../../pages/Loading';
import PrivateRouter from './PrivateRoute';
import NAdminMangeIntroduction from '../../pages/Admin/NAdmin-Manage-Introduction/NAdminMangeIntroduction';
import NIntroduction from '../../pages/NIntroduction/NIntroduction';
import NIntroduction7 from '../../pages/NIntroduction7/NIntroduction7';

const NAccount = lazy(() => import("../../pages/NAccount"))
const NContact = lazy(() => import('../../pages/NContact'))
const NAdmin = lazy(() => import("../../pages/NAdmin"))
const NAddProject = lazy(() => import("../../pages/NAddProject"));
const NIntro = lazy(() => import("../../pages/NIntro"));
const NLogin = lazy(() => import("../../pages/NLogin"));
const NDetail = lazy(() => import('../../pages/NDetail'));
const NotFound = lazy(() => import("../../pages/NotFound"));
const Home = lazy(() => import("../../pages/Home"));
const Faq = lazy(() => import("../../pages/Faq"));
const Contact = lazy(() => import("../../pages/Contact"));
const ProjectListCommercial = lazy(() => import("../../pages/Project/ProjectList/Commercial"));
const ProjectListResearching = lazy(() => import("../../pages/Project/ProjectList/Researching"));
const ProjectListIdea = lazy(() => import("../../pages/Project/ProjectList/Idea"));
const ProjectDetailCommercial = lazy(() => import("../../pages/Project/ProjectDetail/Commercial"));
const Group = lazy(() => import("../../pages/Group"));
const GroupDetail = lazy(() => import("../../pages/Group/GroupDetail"));
const MemberDetail = lazy(() => import("../../pages/Group/MemberDetail"));
const SignIn = lazy(() => import("../../pages/Auth/SignIn"));
const SignUp = lazy(() => import("../../pages/Auth/Signup"));
const ResetPassword = lazy(() => import("../../pages/Auth/FormResetPassword"));
const  OAuth2RedirectHandler = lazy(() => import("../../pages/Auth/OAuth2RedirectHandler"));

const About = lazy(() => import("../../pages/About"));

const Researcher = lazy(() => import("../../pages/Researcher"));
const ResearcherProjects = lazy(() => import("../../pages/Researcher/Researcher-Projects"));
const ResearcherProjectEdit = lazy(() => import("../../pages/Researcher/Researcher-Projects/ProjectEdit"));

const ProjectCreateCommercial = lazy(() => import("../../pages/Project/ProjectCreate")) ;

const Admin = lazy(() => import("../../pages/Admin"));

const AdminManageInformation = lazy(() => import("../../pages/Admin/Admin-Manage-Infomations"));
const AdminManageField = lazy(() => import("../../pages/Admin/Admin-Manage-Infomations/Admin-Field"));
const AdminManageLevel = lazy(() => import("../../pages/Admin/Admin-Manage-Infomations/Admin-Level"));
const AdminManageTransmisstionMethod = lazy(() => import("../../pages/Admin/Admin-Manage-Infomations/Admin-TransmisstionMethod"));
const AdminManageStatus = lazy(() => import("../../pages/Admin/Admin-Manage-Infomations/Admin-Status"));

const AdminManageAbout = lazy(() => import("../../pages/Admin/Admin-Manage-About"));
const AdminManageCreateAbout = lazy(() => import("../../pages/Admin/Admin-Manage-About/Components/AddAbout"));
const AdminManageEditAbout = lazy(() => import("../../pages/Admin/Admin-Manage-About/Components/EditAbout"));

const AdminManageEditProject = lazy(() => import("../../pages/Admin/Admin-Manage-Project/ProjectEdit"));
const AdminProjectPreview = lazy(() => import("../../pages/Admin/Admin-Manage-Project/ProjectPreview"));

const AdminManageUsers = lazy(() => import("../../pages/Admin/Admin-Manage-User"));
const AdminManageAddUser = lazy(() => import("../../pages/Admin/Admin-Manage-User/AddUser"));
const AdminManageEditUser = lazy(() => import("../../pages/Admin/Admin-Manage-User/EditUser"));

const AdminManageRoles = lazy(() => import("../../pages/Admin/Admin-Manage-Role"));

const AdminManageDomains = lazy(() => import("../../pages/Admin/Admin-Manage-Domain"));

const AdminManageFAQ = lazy(() => import("../../pages/Admin/Admin-Manage-FAQ"));

const AdminManageFunction = lazy(() => import("../../pages/Admin/Admin-Manage-Function"));

const AdminManageResearchGroup = lazy(() => import("../../pages/Admin/Admin-Manage-ResearchGroup"));
const AdminAddResearchGroup = lazy(() => import("../../pages/Admin/Admin-Manage-ResearchGroup/AddGroup"));
const AdminEditResearchGroup = lazy(() => import("../../pages/Admin/Admin-Manage-ResearchGroup/EditGroup"));
const AdminAddMemerToResearchGroup = lazy(() => import("../../pages/Admin/Admin-Manage-ResearchGroup/EditGroup/AddMember"));
const AdminEditOutSideMemer = lazy(() => import("../../pages/Admin/Admin-Manage-ResearchGroup/EditGroup/EditOutsideMember"));

const AdminManageContact = lazy(() => import("../../pages/Admin/Admin-Manage-Contact"));

const AdminManageProjects = lazy(() => import("../../pages/Admin/Admin-Manage-Project")) ;
const AdminManageFooter = lazy(() => import("../../pages/Admin/Admin-Manage-Footer"));
const AdminEditFooter = lazy(() => import("../../pages/Admin/Admin-Manage-Footer/Components/EditFooter")) ;

const AdminManageHomeVideo = lazy(() => import("../../pages/Admin/Admin-Manage-Home-Video"));
const AdminEditHomeVideo = lazy(() => import("../../pages/Admin/Admin-Manage-Home-Video/Edit"));

const RouterCustom = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route exact path="/" component={ProjectListCommercial}/>

                {/* test/informal */}
                <Route exact path="/modify-introduction" component={NAdminMangeIntroduction} />
                {/*  */}

                {/* We have to code here update new version */}

                <Route exact path="/projects" component={NAddProject} />
                <Route exact path="/login" component={NLogin} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/introduction" component={NIntroduction7} />
                <Route exact path="/contact" component={NContact} />
                <Route exact path="/administrator" component={NAdmin} />
                <Route exact path="/projects/detail/:id" component={NDetail} />
                <Route exact path="/account" component={NAccount} />

                {/* We have to code here update new version */}

                {/* <Route exact path="/" component={ProjectListCommercial}/> */}
                <Route exact path="/faqs" component={Faq}/>
                <Route exact path="/san-pham/thuong-mai" component={ProjectListCommercial}/>
                <Route exact path="/san-pham/nghien-cuu" component={ProjectListResearching}/>
                <Route exact path="/san-pham/y-tuong" component={ProjectListIdea}/>
                <Route exact path="/san-pham/chi-tiet/:projectType/:id/" component={ProjectDetailCommercial}/>
                <Route exact path="/lien-he" component={Contact}/>
                
                <Route exact path="/nhom-nghien-cuu" component={Group}/>
                <Route exact path="/nhom-nghien-cuu/:id" component={GroupDetail}/>
                <Route exact path="/nhom-nghien-cuu/:groupId/thanh-vien/:memberId" component={MemberDetail}/>
                
                <Route exact path="/dang-nhap" component={SignIn}/>
                <Route exact path="/dang-ky" component={SignUp}/>
                <Route exact path="/quen-mat-khau" component={ResetPassword}/>
                <Route path="/authentication/google" component={OAuth2RedirectHandler}></Route>

                <Route exact path="/gioi-thieu" component={About}/>

                <PrivateRouter exact path={`${ROUTE_PREFIX_NNC}`} component={Researcher}/>
                <PrivateRouter exact path={`${ROUTE_NNC_PROJECTS}`} component={ResearcherProjects}/>
                <PrivateRouter exact path={ROUTE_NNC_CREATE_PROJECT} component={ProjectCreateCommercial}/>
                <PrivateRouter exact path={`${ROUTE_NNC_EDIT_PROJECT}/:projectType/:id`} component={ResearcherProjectEdit}/>

                <PrivateRouter exact path="/admin" component={Admin}/>

                <PrivateRouter exact path="/admin/informations" component={AdminManageInformation}/>
                <PrivateRouter exact path="/admin/fields" component={AdminManageField}/>
                <PrivateRouter exact path="/admin/development-levels" component={AdminManageLevel}/>
                <PrivateRouter exact path="/admin/transmisstion-methods" component={AdminManageTransmisstionMethod}/>
                <PrivateRouter exact path="/admin/status" component={AdminManageStatus}/>

                <PrivateRouter exact path="/admin/abouts" component={AdminManageAbout}/>
                <PrivateRouter exact path="/admin/abouts/new" component={AdminManageCreateAbout}/>
                <PrivateRouter exact path="/admin/abouts/edit/:id" component={AdminManageEditAbout}/>

                <PrivateRouter exact path="/admin/projects" component={AdminManageProjects}/>
                <PrivateRouter exact path="/admin/projects/edit/:id" component={AdminManageEditProject}/>
                <PrivateRouter exact path="/admin/projects/preview/:projectType/:id" component={AdminProjectPreview}/>

                <PrivateRouter exact path="/admin/users" component={AdminManageUsers}/>
                <PrivateRouter exact path="/admin/users/new" component={AdminManageAddUser}/>
                <PrivateRouter exact path="/admin/users/edit/:id" component={AdminManageEditUser}/>

                <PrivateRouter exact path="/admin/roles" component={AdminManageRoles}/>

                <PrivateRouter exact path="/admin/domains" component={AdminManageDomains}/>

                <PrivateRouter exact path="/admin/faqs" component={AdminManageFAQ}/>
                
                <PrivateRouter exact path="/admin/functions" component={AdminManageFunction}/>

                <PrivateRouter exact path="/admin/research-groups" component={AdminManageResearchGroup}/>
                <PrivateRouter exact path="/admin/research-groups/new" component={AdminAddResearchGroup}/>
                <PrivateRouter exact path="/admin/research-groups/edit/:id" component={AdminEditResearchGroup}/>
                <PrivateRouter exact path="/admin/research-groups/add-member/:id" component={AdminAddMemerToResearchGroup}/>
                <PrivateRouter exact path="/admin/research-groups/:groupId/edit-member/:memberId" component={AdminEditOutSideMemer}/>

                <PrivateRouter exact path="/admin/contacts" component={AdminManageContact}/>

                <PrivateRouter exact path="/admin/footers" component={AdminManageFooter}/>
                <PrivateRouter exact path="/admin/footers/edit/:id" component={AdminEditFooter}/>


                <PrivateRouter exact path="/admin/home-video" component={AdminManageHomeVideo}/>
                <PrivateRouter exact path="/admin/home-video/edit/:id" component={AdminEditHomeVideo}/>

                <Route exact path="*" component={NotFound}/>
                {/* <Route exact path="/login" element={<Login/>}/> */}
                {/* <Route exact path="/recovery-password" element={<RecoveryPassword/>}/> */}
                {/* <Route path="*" element={<NotFound/>}/> */}
            </Switch>
        </Suspense>
    )
}

export default RouterCustom;