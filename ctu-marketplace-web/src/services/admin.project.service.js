import api from '../api/adminProject';
import authHeader from './auth.header'
import { 
    PROJECTS_ADMIN_COMMERCIAL_URL, 
    PROJECTS_BY_CTU_OTHER_DOMAIN_URL,
    PROJECTS_ADMIN_RESEARCHING_URL,
    PROJECTS_APPROVE_URL,
    PROJECTS_BY_DOMAIN_ID_URL,
    PROJECTS_ADMIN,
    PROJECTS_BY_USER_ID_URL,
    PROJECTS_ADMIN_IDEA_URL,
    PROJECTS_ADMIN_DELETE_BY_ID_URL

} from '../environments/constraints';

class AdminProjectService {
    
    // {approverId, projectId, statusId, reason}
    approveProject(data) {
        return api.put(`${PROJECTS_APPROVE_URL}`, data, {headers: authHeader()});
    }
  
    getAllByCtuOrOtherDomain() {
        return api.get(`${PROJECTS_BY_CTU_OTHER_DOMAIN_URL}`, {headers: authHeader()} );
    }
    
    getAllByDomainId(domainId) {
        return api.get(`${PROJECTS_BY_DOMAIN_ID_URL}/${domainId}`, {headers: authHeader()} );
    }
    
    getAllByUserId(userId) {
        return api.get(`${PROJECTS_BY_USER_ID_URL}/${userId}`, {headers: authHeader()} );
    }
    
    getAllByUseridProjecttypeStatusid(userId, projectType, statusId) {
        return api.get(`${PROJECTS_ADMIN}?userId=${userId}&projectType=${projectType}&statusId=${statusId}`, {headers: authHeader()} );
    }

    deleteProjectById(id) {
        return api.delete(`${PROJECTS_ADMIN_DELETE_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }
    
    // getAllByStatus(statusId) {
    //     return api.get(`${PROJECTS_BY_STATUS_URL}/${statusId}`, {headers: authHeader()} );
    // }
    
    // Commercial project
    getCommercialById(id) {
        return api.get(`${PROJECTS_ADMIN_COMMERCIAL_URL}/${id}`, {headers: authHeader()} );
    }

    createCommercial(data) {
        return api.post(PROJECTS_ADMIN_COMMERCIAL_URL, data, {headers: authHeader()} );
    }

    updateCommercial(id, data) {
        return api.put(`${PROJECTS_ADMIN_COMMERCIAL_URL}/${id}`, data, {headers: authHeader()} );
    }

    deleteCommercial(id) {
        return api.delete(`${PROJECTS_ADMIN_COMMERCIAL_URL}/${id}`, {headers: authHeader()} );
    }
    
    // Researching project
    getResearchingById(id) {
        return api.get(`${PROJECTS_ADMIN_RESEARCHING_URL}/${id}`, {headers: authHeader()} );
    }

    createResearching(data) {
        return api.post(PROJECTS_ADMIN_RESEARCHING_URL, data, {headers: authHeader()} );
    }

    updateResearching(id, data) {
        return api.put(`${PROJECTS_ADMIN_RESEARCHING_URL}/${id}`, data, {headers: authHeader()} );
    }

    deleteResearching(id) {
        return api.delete(`${PROJECTS_ADMIN_RESEARCHING_URL}/${id}`, {headers: authHeader()} );
    }

    // Idea project
    getIdeaById(id) {
        return api.get(`${PROJECTS_ADMIN_IDEA_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new AdminProjectService();
