import api from '../api/admin.customerContact';
import authHeader from './auth.header'
import { CONTACT_ADMIN_CUSTOMER_URL, CONTACT_ADMIN_CUSTOMER_BY_USERID_URL } from '../environments/constraints';

class AdminCustomerContactService {
  
    getAll() {
        return api.get(CONTACT_ADMIN_CUSTOMER_URL, {headers: authHeader()});
    }
    
    getAllByUserId(userId) {
        return api.get(`${CONTACT_ADMIN_CUSTOMER_BY_USERID_URL}/${userId}`, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${CONTACT_ADMIN_CUSTOMER_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(CONTACT_ADMIN_CUSTOMER_URL, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${CONTACT_ADMIN_CUSTOMER_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${CONTACT_ADMIN_CUSTOMER_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new AdminCustomerContactService();
