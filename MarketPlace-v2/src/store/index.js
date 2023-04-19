// store/index.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import aboutSlice from "./aboutSlice";
import aboutAdminSlice from "./admin.aboutSlice";
import customerContactAdminSlice from "./admin.customer.contactSlice";
import developmentLevelAdminSlice from "./admin.developmentLevelSlice";
import domainAdminSlice from "./admin.domainSlice";
import faqAdminReducer from "./admin.faqSlice";
import fieldAdminReducer from "./admin.fieldSlice";
import footerAdminSlice from "./admin.footerSlice";
import functionAdminSlice from "./admin.functionSlice";
import generalContactAdminSlice from "./admin.general.contactSlice";
import homeVideoAdminSlice from "./admin.homeVideoSlice";
import projectAdminReducer from "./admin.projectSlice";
import researchGroupAdminSlice from "./admin.researchGroupSlice";
import roleOfGroupAdminSlice from "./admin.roleOfGroupSlice";
import roleAdminSlice from "./admin.roleSlice";
import transmisstionMethodAdminSlice from "./admin.transmisstionMethodSlice";
import userReducer from "./admin.userSlice";
import authSlice from "./authSlice";
import contactSlice from "./contact.contactSlice";
import customerContactSlice from "./customer.contactSlice";
import developmentLevelSlice from "./developmentLevelSlice";
import faqReducer from "./faqSlice";
import fieldReducer from "./fieldSlice";
import filterProjectFieldSlice from "./filterProjectFieldSlice";
import footerSlice from "./footerSlice";
import homeVideoSlice from "./homeVideoSlice";
import loadingReducer from "./loadingSlice";
import projectCommerReducer from "./projectCommercialSlice";
import projectReducer from "./projectSlice";
import relatedProjectsSlice from "./relatedProjectsSlice";
import researcherDomainSlice from "./researcher.domainSlice";
import researchProjectsSlice from "./researcher.projectSlice";
import researcherStatusSlice from "./researcher.statusSlice";
import researcherProfileSlice from "./researcher.userSlice";
import researchGroupReducer from "./researchGroupSlice";
import statusSlice from "./statusSlice";
import transmisstionMethodSlice from "./transmisstionMethodSlice";

const combinedReducer = combineReducers({
  auth: authSlice,
  usersAdmin: userReducer,
  researchGroups: researchGroupReducer,
  projects: projectReducer,
  projectsAdmin: projectAdminReducer,
  projectsCommercial: projectCommerReducer,
  faqs: faqReducer,
  faqsAdmin: faqAdminReducer,
  loading: loadingReducer,
  fields: fieldReducer,
  fieldsAdmin: fieldAdminReducer,
  developmentLevels: developmentLevelSlice,
  developmentLevelsAdmin: developmentLevelAdminSlice,
  transmisstionMethods: transmisstionMethodSlice,
  transmisstionMethodsAdmin: transmisstionMethodAdminSlice,
  abouts: aboutSlice,
  aboutsAdmin: aboutAdminSlice,
  status: statusSlice,
  rolesAdmin: roleAdminSlice,
  domainsAdmin: domainAdminSlice,
  functionsAdmin: functionAdminSlice,
  researchGroupsAdmin: researchGroupAdminSlice,
  researchProjects: researchProjectsSlice,
  roleOfGroupAdmins: roleOfGroupAdminSlice,
  contacts: contactSlice,
  customerContacts: customerContactSlice,
  generalContactsAdmin: generalContactAdminSlice,
  customerContactsAdmin: customerContactAdminSlice,
  footers: footerSlice,
  footersAdmin: footerAdminSlice,
  researcherProfile: researcherProfileSlice,
  researcherDomains: researcherDomainSlice,
  researcherStatus: researcherStatusSlice,
  relatedProjects: relatedProjectsSlice,
  homeVideo: homeVideoSlice,
  homeVideoAdmin: homeVideoAdminSlice,
  filterProjectField: filterProjectFieldSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // check for action type
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
});
