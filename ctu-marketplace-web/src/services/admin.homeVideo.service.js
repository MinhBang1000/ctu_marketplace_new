import api from '../api/adminFaq';
import authHeader from './auth.header'
import { HOME_VIDEO_ADMIN_URL } from '../environments/constraints';

class homeVideoAdminService {
  
    getById(id) {
        return api.get(`${HOME_VIDEO_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${HOME_VIDEO_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

}

export default new homeVideoAdminService();
