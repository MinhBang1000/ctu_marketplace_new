import api from '../api/contact';
import authHeader from './auth.header'
import { CONTACT_URL } from '../environments/constraints';

class ContactService {
  
    getAll() {
        return api.get(CONTACT_URL, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${CONTACT_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(CONTACT_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${CONTACT_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${CONTACT_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new ContactService();
