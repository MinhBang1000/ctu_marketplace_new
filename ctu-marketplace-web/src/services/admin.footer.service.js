import api from '../api/admin.footer';
import authHeader from './auth.header'
import { FOOTER_ADMIN_URL } from '../environments/constraints';

class FooterAdminService {
  
    getAll() {
        return api.get(FOOTER_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${FOOTER_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(FOOTER_ADMIN_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${FOOTER_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${FOOTER_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new FooterAdminService();
