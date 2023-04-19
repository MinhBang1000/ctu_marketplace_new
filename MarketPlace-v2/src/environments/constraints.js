module.exports = {
   ROLE_SUPER_ADMIN : 'SAD',
   ROLE_ADMIN : 'AD',
   ROLE_NNC : 'NNC',
   ROLE_USER : 'KCH',
   // -------------------------------------------------------------------------

   LOGIN_URL : '/auth/login',
   RESET_PASSWORD_URL : '/auth/reset-password',
   SIGNUP_URL : '/users',
   SIGNUP_RESEARCHER_USER_URL : '/users/sign-up/researcher-user',
   SIGNUP_NORMAL_USER_URL : '/users/sign-up/normal-user',
   // -------------------------------------------------------------------------
   
   FIELD_RESEARCHER_URL: '/researcher/fields',
   FIELD_PUBLIC_URL: '/public/fields',
   FIELD_ADMIN_URL: '/admin/field-management',
   // -------------------------------------------------------------------------

   LEVEL_URL : '/researcher/development-levels',
   LEVEL_TEST_URL : '/development-level-management/get-all',
   LEVEL_ADMIN_URL : '/admin/development-level-management',
   // -------------------------------------------------------------------------

   CATEGORY_URL : '/categories',
   CATEGORY_ADMIN_URL : '/admin/categories',
   // -------------------------------------------------------------------------

   PROJECTS_URL : '/projects',

   PROJECTS_PUBLIC_URL : '/public/projects',
   RELATED_PROJECTS_PUBLIC_URL : '/public/projects/related',
   PROJECTS_PUBLIC_COMMERCIAL_URL : '/public/projects/commercial',
   PROJECTS_PUBLIC_RESEARCHING_URL : '/public/projects/researching',
   PROJECTS_PUBLIC_IDEA_URL : '/public/projects/idea',
   
   PROJECTS_BY_STATUS_URL : '/projects/status',
   
   PROJECTS_COMMERCIAL_URL : '/projects/commercial',
   PROJECTS_RESEARCHING_URL : '/projects/researching',
   
   // -------------------------------------------------------------------------
   PROJECTS_ADMIN_URL : '/admin/projects',
   PROJECTS_ADMIN_DELETE_BY_ID_URL : '/admin/project-management/delete/projectId',
   
   PROJECTS_ADMIN_COMMERCIAL_URL : '/admin/project-management/commercial',
   
   PROJECTS_ADMIN : '/admin/project-management/projects',
   PROJECTS_ADMIN_RESEARCHING_URL : '/admin/project-management/researching',
   PROJECTS_ADMIN_IDEA_URL : '/admin/project-management/idea',
   
   PROJECTS_BY_DOMAIN_ID_URL : '/admin/project-management/domain',
   PROJECTS_BY_USER_ID_URL : '/admin/project-management/projects/userId',
   PROJECTS_BY_CTU_OTHER_DOMAIN_URL : '/admin/project-management/ctu-khc',
   PROJECTS_APPROVE_URL : '/admin/project-management/approve',
   // -------------------------------------------------------------------------

   // -------------------------------------------------------------------------
   PROJECTS_RESEARCHER_COMMERCIAL_BY_ID_URL : '/researcher/projects/commercial',
   PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL : '/researcher/projects/researching',
   PROJECTS_RESEARCHER_IDEA_BY_ID_URL : '/researcher/projects/idea',
   PROJECTS_RESEARCHER_URL : '/researcher/projects',
   PROJECTS_RESEARCHER_BY_ID_URL : '/researcher/projects/userId',
   PROJECTS_RESEARCHER_DELETE_BY_ID_URL : '/researcher/projects/delete/projectId',
   // -------------------------------------------------------------------------
   
   TRANSMISSION_URL : '/researcher/trans-methods',
   TRANSMISSION_ADMIN_URL : '/admin/transmission-method-management',
   // -------------------------------------------------------------------------
   
   STATUS_URL : '/statuses',
   STATUS_ADMIN_URL : '/admin/status-management',
   STATUS_RESEARCHER_URL : '/researcher/status',
   // -------------------------------------------------------------------------
   
   FUNCTIONS_ADMIN_URL : '/admin/function-management',
   // -------------------------------------------------------------------------

   DOMAINS_ADMIN_URL : '/admin/domain-management',
   
   // -------------------------------------------------------------------------
   DOMAINS_RESEARCHER_URL : '/researcher/domains',
   // -------------------------------------------------------------------------

   ROLES_URL : '/roles',
   ROLES_ADMIN_URL : '/admin/role-management',
   ROLE_OF_GROUP_ADMIN_URL : '/admin/role-of-group-management',
   // -------------------------------------------------------------------------

   CREATE_RESEARCHER_USER_ADMIN_URL : '/admin/users/create-researcher',
   CREATE_ADMIN_USER_ADMIN_URL : '/admin/users/create-admin',
   USER_RESEARCHER_URL : '/users/researcher-user',
   USER_NORMAL_ADMIN_URL : '/users/normal-user',
   USER_RESEARCHER_ADMIN_URL : '/admin/users/update-research',
   USER_ADMIN_URL : '/admin/user-management/users',
   USER_ADMIN_RESEARCHER_USERS_URL : '/admin/user-management/users/researcher',
   USER_ID_URL : '/users/id',
   USER_ID_USERNAME : '/auth',
   USER_PUBLIC_NORMAL_USER_SIGNUP_URL : '/auth/sign-up/guest',
   USER_PUBLIC_RESEARCHER_SIGNUP_URL : '/auth/sign-up/researcher',
   USER_ADMIN_RESEARCHER_URL : '/admin/user-management/researcher',
   USER_ADMIN_ADMIN_URL : '/admin/user-management/admin',
   USER_ADMIN_USER_FUNCTION_URL : '/admin/user-management/assign-access-rights-to-user',
   USER_ADMIN_ENABLE_USER_URL : '/admin/user-management/enable-user',
   USER_ADMIN_DELETE_BY_USERNAME_URL : '/admin/user-management/delete-user',
   // -------------------------------------------------------------------------
   
   USER_FUNCTION_ADMIN_URL : '/admin/userFunctions',
   // -------------------------------------------------------------------------

   RESEARCH_GROUP_URL : '/public/research-groups',
   RESEARCH_GROUP_ADMIN_URL : '/admin/research-group-management',
   RESEARCH_GROUP_ADMIN_BY_USER_ID_URL : '/admin/research-group-management/userId',
   RESEARCH_GROUP_ADMIN_DELETE_MEMBER_URL : '/admin/research-group-management/delete-group-members',
   RESEARCH_GROUP_ADMIN_ADD_MEMBER_URL : '/admin/research-group-management/add-member-to-group',
   RESEARCH_GROUP_ADMIN_ADD_OTHER_MEMBER_URL : '/admin/research-group-management/add-other-member-to-group',
   RESEARCH_GROUP_ADMIN_UPDATE_OTHER_MEMBER_URL : '/admin/research-group-management/group-detail-id',
   RESEARCH_GROUP_DETAIL_ADMIN_URL : '/admin/group-details',
   RESEARCH_URL : '/researcher/users',
   RESEARCH_CHANGE_PASSWORD_URL : '/researcher/users/update-password',
   // -------------------------------------------------------------------------

   FAQ_URL : '/public/faqs',
   FAQ_ADMIN_URL : '/admin/faq-management',
   FAQ_ADMIN_DELETE_URL : '/admin/faq-management/delete-faq',
   // -------------------------------------------------------------------------

   CONTACT_URL : '/public/contact',
   // CONTACT_ADMIN_URL : '/admin/contact-management/contact',
   CONTACT_ADMIN_GENERAL_URL : '/admin/contact-management/contact',
   CONTACT_ADMIN_CUSTOMER_URL : '/admin/contact-management/customer-contact/ctu-khc',
   CONTACT_ADMIN_CUSTOMER_BY_USERID_URL : '/admin/contact-management/customer-contact/userId',
   CUSTOMER_CONTACT_URL : '/public/customer-contact',
   // CUSTOMER_CONTACT_ADMIN_URL : '/admin/customer-contacts',
   // -------------------------------------------------------------------------

   ABOUT_URL : '/about-pages',
   ABOUT_PUBLIC_URL : '/public/about-page',
   ABOUT_ADMIN_URL : '/admin/about-page-management',

   // Footer
   FOOTER_ADMIN_URL : '/admin/footer-management',
   FOOTER_PUBLIC_URL : '/public/footer',

   // -------------------------------------------------------------------------
   // home video
   HOME_VIDEO_URL : '/public/home-page-video',

   HOME_VIDEO_ADMIN_URL : '/admin/home-page-video-management',

} 