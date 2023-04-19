import api from '../api/adminFaq';
import authHeader from './auth.header'
import { FAQ_URL, FAQ_ADMIN_URL, FAQ_ADMIN_DELETE_URL } from '../environments/constraints';

class FaqAdminService {
  
    getAll() {
        return api.get(FAQ_ADMIN_URL, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${FAQ_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(FAQ_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${FAQ_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${FAQ_ADMIN_DELETE_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new FaqAdminService();
