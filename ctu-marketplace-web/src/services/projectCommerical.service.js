import api from '../api/project';
import { 
    PROJECTS_COMMERCIAL_URL, 
    PROJECTS_PUBLIC_COMMERCIAL_URL, 
    PROJECTS_PUBLIC_RESEARCHING_URL, 
    PROJECTS_PUBLIC_IDEA_URL 
} from '../environments/constraints';

class ProjectCommercialService {
  
    getAll() {
        return api.get(`${PROJECTS_PUBLIC_COMMERCIAL_URL}`);
    }
    
    getCommercialById(id) {
        return api.get(`${PROJECTS_PUBLIC_COMMERCIAL_URL}/${id}`);
    }
    
    getResearchingById(id) {
        return api.get(`${PROJECTS_PUBLIC_RESEARCHING_URL}/${id}`);
    }
    
    getIdeaById(id) {
        return api.get(`${PROJECTS_PUBLIC_IDEA_URL}/${id}`);
    }

    create(data) {
        return api.post(PROJECTS_COMMERCIAL_URL, data);
    }

    update(id, data) {
        return api.put(`${PROJECTS_COMMERCIAL_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${PROJECTS_COMMERCIAL_URL}/${id}`);
    }

}

export default new ProjectCommercialService();
