import api from '../api/researcher.profile';
import {
    RESEARCH_CHANGE_PASSWORD_URL, RESEARCH_URL
} from '../environments/constraints';
import authHeader from './auth.header';

class UserAdminService {
  
    updateProfile(id, data) {
        return api.put(`${RESEARCH_URL}/${id}`, data, {headers: authHeader()} );
    }
    
    changePassword(id, data) {
        return api.put(`${RESEARCH_CHANGE_PASSWORD_URL}/${id}`, data, {headers: authHeader()} );
    }

}

export default new UserAdminService();
