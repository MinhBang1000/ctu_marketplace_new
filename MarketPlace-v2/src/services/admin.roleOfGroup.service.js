import api from '../api/admin.roleOfGroup';
import authHeader from './auth.header'
import { ROLE_OF_GROUP_ADMIN_URL } from '../environments/constraints';

class RoleOfGroupAdminService {
  
    getAll() {
        return api.get(`${ROLE_OF_GROUP_ADMIN_URL}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${ROLE_OF_GROUP_ADMIN_URL}/${id}`, {headers: authHeader()});
    }

    create(data) {
        return api.post(ROLE_OF_GROUP_ADMIN_URL, data, {headers: authHeader()});
    }

    update(id, data) {
        return api.put(`${ROLE_OF_GROUP_ADMIN_URL}/${id}`, data, {headers: authHeader()});
    }

    delete(id) {
        return api.delete(`${ROLE_OF_GROUP_ADMIN_URL}/${id}`, {headers: authHeader()});
    }

}

export default new RoleOfGroupAdminService();
