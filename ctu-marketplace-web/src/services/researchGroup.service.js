import api from '../api/researchGroup';
import { RESEARCH_GROUP_URL } from '././../environments/constraints';

class ResearchGroupService {
  
    getAll() {
        return api.get(RESEARCH_GROUP_URL);
    }
    
    getById(id) {
        return api.get(`${RESEARCH_GROUP_URL}/${id}`);
    }

    create(data) {
        return api.post(RESEARCH_GROUP_URL, data);
    }

    update(id, data) {
        return api.put(`${RESEARCH_GROUP_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${RESEARCH_GROUP_URL}/${id}`);
    }

}

export default new ResearchGroupService();
