import api from '../api/footer';
import authHeader from './auth.header'
import { FOOTER_ADMIN_URL, FOOTER_PUBLIC_URL } from '../environments/constraints';

class FooterService {
  
    getAll() {
        return api.get(FOOTER_ADMIN_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${FOOTER_PUBLIC_URL}/${id}`);
    }

    create(data) {
        return api.post(FOOTER_ADMIN_URL, data);
    }

    update(id, data) {
        return api.put(`${FOOTER_ADMIN_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${FOOTER_ADMIN_URL}/${id}`);
    }

}

export default new FooterService();
