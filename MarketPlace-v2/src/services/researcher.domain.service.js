import api from '../api/admin.roleOfGroup';
import authHeader from './auth.header'
import { DOMAINS_RESEARCHER_URL } from '../environments/constraints';

class DomainResearcherService {
  
    getAll() {
        return api.get(`${DOMAINS_RESEARCHER_URL}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${DOMAINS_RESEARCHER_URL}/${id}`, {headers: authHeader()});
    }

    create(data) {
        return api.post(DOMAINS_RESEARCHER_URL, data, {headers: authHeader()});
    }

    update(id, data) {
        return api.put(`${DOMAINS_RESEARCHER_URL}/${id}`, data, {headers: authHeader()});
    }

    delete(id) {
        return api.delete(`${DOMAINS_RESEARCHER_URL}/${id}`, {headers: authHeader()});
    }

}

export default new DomainResearcherService();
