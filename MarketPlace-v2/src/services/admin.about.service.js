import api from '../api/admin.about';
import authHeader from './auth.header'
import { ABOUT_ADMIN_URL } from '../environments/constraints';

class AboutAdminService {
  
    getAll() {
        return api.get(ABOUT_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${ABOUT_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(ABOUT_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${ABOUT_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${ABOUT_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new AboutAdminService();
