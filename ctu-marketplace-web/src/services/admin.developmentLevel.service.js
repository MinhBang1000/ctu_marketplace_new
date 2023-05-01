import api from '../api/admin.developmentLevel';
import authHeader from './auth.header'
import { LEVEL_ADMIN_URL, } from '../environments/constraints';

class DevelopmentLevelAdminService {
  
    getAll() {
        return api.get(LEVEL_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${LEVEL_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(LEVEL_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${LEVEL_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${LEVEL_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new DevelopmentLevelAdminService();
