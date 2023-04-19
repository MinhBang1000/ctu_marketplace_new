import api from '../api/researcher.project';
import authHeader from './auth.header'
import { 
    PROJECTS_RESEARCHER_URL,
    PROJECTS_RESEARCHER_BY_ID_URL,
    PROJECTS_RESEARCHER_COMMERCIAL_BY_ID_URL,
    PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL,
    PROJECTS_RESEARCHER_IDEA_BY_ID_URL,
    PROJECTS_RESEARCHER_DELETE_BY_ID_URL

} from '../environments/constraints';

class ResearcherProjectService {
    
    getAll() {
        return api.get(`${PROJECTS_RESEARCHER_URL}`, {headers: authHeader()} );
    }

    getAllByUseridProjecttypeStatusid(userId, projectType, statusId) {
        return api.get(`${PROJECTS_RESEARCHER_URL}?userId=${userId}&projectType=${projectType}&statusId=${statusId}`, {headers: authHeader()} );
    }
    
    getAllByResearcherId(researcherId) {
        return api.get(`${PROJECTS_RESEARCHER_BY_ID_URL}/${researcherId}`, {headers: authHeader()} );
    }

    deleteProjectById (id) {
        return api.delete(`${PROJECTS_RESEARCHER_DELETE_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }
    
    // Commercial project
    getAllCommercial(researcherId) {
        return api.get(`${PROJECTS_RESEARCHER_URL}/${researcherId}`, {headers: authHeader()} );
    }

    getCommercialById(id) {
        return api.get(`${PROJECTS_RESEARCHER_COMMERCIAL_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }

    createCommercial(data) {
        return api.post(PROJECTS_RESEARCHER_URL, data, {headers: authHeader()} );
    }

    updateCommercial(id, data) {
        return api.put(`${PROJECTS_RESEARCHER_URL}/${id}`, data, {headers: authHeader()} );
    }

    deleteCommercial(id) {
        return api.delete(`${PROJECTS_RESEARCHER_URL}/${id}`, {headers: authHeader()} );
    }
    
    // Researching project
    getAllResearching(researcherId) {
        return api.get(`${PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL}/${researcherId}`, {headers: authHeader()} );
    }

    getResearchingById(id) {
        return api.get(`${PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }
    
    createResearching(data) {
        return api.post(PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL, data, {headers: authHeader()} );
    }

    updateResearching(id, data) {
        return api.put(`${PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL}/${id}`, data, {headers: authHeader()} );
    }

    deleteResearching(id) {
        return api.delete(`${PROJECTS_RESEARCHER_RESEARCHING_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }

    // Idea project
    getIdeaById(id) {
        return api.get(`${PROJECTS_RESEARCHER_IDEA_BY_ID_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new ResearcherProjectService();
