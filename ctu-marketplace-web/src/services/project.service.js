import api from '../api/project';
import authHeader from './auth.header'
import { 
    PROJECTS_PUBLIC_URL, 
    PROJECTS_PUBLIC_COMMERCIAL_URL, 
    PROJECTS_PUBLIC_RESEARCHING_URL,
    PROJECTS_PUBLIC_IDEA_URL,
    RELATED_PROJECTS_PUBLIC_URL

} from '../environments/constraints';

class ProjectService {
  
    getAll() {
        return api.get(`${PROJECTS_PUBLIC_URL}`, {headers: authHeader()} );
    }
    
    getRelatedProjectsByProjectId(projectId) {
        return api.get(`${RELATED_PROJECTS_PUBLIC_URL}/${projectId}`, {headers: authHeader()} );
    }
    
    getAllCommercialProject() {
        return api.get(`${PROJECTS_PUBLIC_COMMERCIAL_URL}`, {headers: authHeader()} );
    }
    
    getAllResearchingProject() {
        return api.get(`${PROJECTS_PUBLIC_RESEARCHING_URL}`, {headers: authHeader()} );
    }
    
    getAllIdeaProject() {
        return api.get(`${PROJECTS_PUBLIC_IDEA_URL}`, {headers: authHeader()} );
    }
    
    getAllByStatus(statusId) {
        return api.get(`${PROJECTS_PUBLIC_URL}/${statusId}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${PROJECTS_PUBLIC_URL}/${id}`, {headers: authHeader()} );
    }
    
    getCommercialProjectById(id) {
        return api.get(`${PROJECTS_PUBLIC_COMMERCIAL_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(PROJECTS_PUBLIC_URL, data);
    }

    update(id, data) {
        return api.put(`${PROJECTS_PUBLIC_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${PROJECTS_PUBLIC_URL}/${id}`);
    }

}

export default new ProjectService();
