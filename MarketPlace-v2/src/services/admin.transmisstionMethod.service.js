import api from '../api/admin.transmisstionMethod';
import { TRANSMISSION_ADMIN_URL, } from '../environments/constraints';
import authHeader from './auth.header'

class TransmisstionMethodAdminService {
  
    getAll() {
        return api.get(TRANSMISSION_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${TRANSMISSION_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(TRANSMISSION_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${TRANSMISSION_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${TRANSMISSION_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new TransmisstionMethodAdminService();
