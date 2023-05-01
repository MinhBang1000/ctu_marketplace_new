import api from '../api/customerContact';
import authHeader from './auth.header'
import { CUSTOMER_CONTACT_URL } from '../environments/constraints';

class CustomerContactService {
  
    getAll() {
        return api.get(CUSTOMER_CONTACT_URL, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${CUSTOMER_CONTACT_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(CUSTOMER_CONTACT_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${CUSTOMER_CONTACT_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${CUSTOMER_CONTACT_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new CustomerContactService();
