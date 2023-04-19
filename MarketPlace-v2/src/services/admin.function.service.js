import api from '../api/admin.function';
import authHeader from './auth.header'
import { FUNCTIONS_ADMIN_URL } from '../environments/constraints';

class FunctionAdminService {
  
    getAll() {
        return api.get(FUNCTIONS_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${FUNCTIONS_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(FUNCTIONS_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${FUNCTIONS_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${FUNCTIONS_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new FunctionAdminService();
