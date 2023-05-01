import api from '../api/admin.generalContact';
import authHeader from './auth.header'
import { CONTACT_ADMIN_GENERAL_URL } from '../environments/constraints';

class AdminGeneralContactService {
  
    getAll() {
        return api.get(CONTACT_ADMIN_GENERAL_URL, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${CONTACT_ADMIN_GENERAL_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(CONTACT_ADMIN_GENERAL_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${CONTACT_ADMIN_GENERAL_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${CONTACT_ADMIN_GENERAL_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new AdminGeneralContactService();
