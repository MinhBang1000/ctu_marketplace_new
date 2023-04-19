import api from '../api/adminField';
import authHeader from './auth.header'
import { FIELD_ADMIN_URL } from '../environments/constraints';

class FieldAminService {
  
    getAll() {
        return api.get(`${FIELD_ADMIN_URL}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${FIELD_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(FIELD_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${FIELD_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${FIELD_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new FieldAminService();
