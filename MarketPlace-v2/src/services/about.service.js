import api from '../api/about';
import authHeader from './auth.header'
import { ABOUT_URL, ABOUT_PUBLIC_URL } from '../environments/constraints';

class AboutService {
  
    getAll() {
        return api.get(ABOUT_PUBLIC_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${ABOUT_PUBLIC_URL}/${id}`);
    }

    create(data) {
        return api.post(ABOUT_URL, data);
    }

    update(id, data) {
        return api.put(`${ABOUT_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${ABOUT_URL}/${id}`);
    }

}

export default new AboutService();
