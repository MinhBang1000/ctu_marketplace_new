import api from '../api/status';
import authHeader from './auth.header'
import { STATUS_ADMIN_URL } from '../environments/constraints';

class StatusService {
  
    getAll() {
        return api.get(STATUS_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${STATUS_ADMIN_URL}/${id}`);
    }

    create(data) {
        return api.post(STATUS_ADMIN_URL, data);
    }

    update(id, data) {
        return api.put(`${STATUS_ADMIN_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${STATUS_ADMIN_URL}/${id}`);
    }

}

export default new StatusService();
