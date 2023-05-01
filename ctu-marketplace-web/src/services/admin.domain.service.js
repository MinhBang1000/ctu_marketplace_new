import api from '../api/admin.roleOfGroup';
import authHeader from './auth.header'
import { DOMAINS_ADMIN_URL } from '../environments/constraints';

class DomainAdminService {
  
    getAll() {
        return api.get(`${DOMAINS_ADMIN_URL}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${DOMAINS_ADMIN_URL}/${id}`, {headers: authHeader()});
    }

    create(data) {
        return api.post(DOMAINS_ADMIN_URL, data, {headers: authHeader()});
    }

    update(id, data) {
        return api.put(`${DOMAINS_ADMIN_URL}/${id}`, data, {headers: authHeader()});
    }

    delete(id) {
        return api.delete(`${DOMAINS_ADMIN_URL}/${id}`, {headers: authHeader()});
    }

}

export default new DomainAdminService();
