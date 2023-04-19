import api from '../api/admin.role';
import authHeader from './auth.header'
import { ROLES_ADMIN_URL } from '../environments/constraints';

class RoleAdminService {
  
    getAll() {
        return api.get(`${ROLES_ADMIN_URL}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${ROLES_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(ROLES_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${ROLES_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${ROLES_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new RoleAdminService();
