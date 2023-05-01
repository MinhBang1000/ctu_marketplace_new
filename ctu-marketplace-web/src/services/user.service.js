import api from '../api/user';
import {
    USER_ADMIN_ADMIN_URL, USER_ADMIN_DELETE_BY_USERNAME_URL, USER_ADMIN_ENABLE_USER_URL, USER_ADMIN_RESEARCHER_URL, USER_ADMIN_RESEARCHER_USERS_URL, USER_ADMIN_URL, USER_ADMIN_USER_FUNCTION_URL, USER_ID_URL,
    USER_ID_USERNAME, USER_PUBLIC_NORMAL_USER_SIGNUP_URL, USER_PUBLIC_RESEARCHER_SIGNUP_URL
} from '../environments/constraints';
import authHeader from './auth.header';

class UserAdminService {
  
    getAll() {
        return api.get(`${USER_ADMIN_URL}`, {headers: authHeader()});
    }
    
    getAllByUserId(id) {
        return api.get(`${USER_ADMIN_URL}/${id}`, {headers: authHeader()});
    }
    
    getAllResearchers() {
        return api.get(`${USER_ADMIN_RESEARCHER_USERS_URL}`, {headers: authHeader()});
    }
    
    getById(id) {
        return api.get(`${USER_ID_URL}/${id}`);
    }
    
    // auth?username=superadmin
    getByUsername(username) {
        return api.get(`${USER_ID_USERNAME}?username=${username}`, { headers: authHeader() });
    }

    createResearcher(data) {
        return api.post(USER_ADMIN_RESEARCHER_URL, data, {headers: authHeader()} );
    }

    updateResearcher(id, data) {
        return api.put(`${USER_ADMIN_RESEARCHER_URL}/${id}`, data, {headers: authHeader()} );
    }
    
    createAdmin(data) {
        return api.post(USER_ADMIN_ADMIN_URL, data, {headers: authHeader()} );
    }

    updateAdmin(id, data) {
        return api.put(`${USER_ADMIN_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    deleteByUsername(username) {
        return api.delete(`${USER_ADMIN_DELETE_BY_USERNAME_URL}?username=${username}`, {headers: authHeader()} );
    }
    
    // Phan quyen
    updateAdminFunctionStatus(data) {
        return api.put(`${USER_ADMIN_USER_FUNCTION_URL}`, data, {headers: authHeader()} );
    }
    
    // Enable
    enableUser(userId, isEnabled) {
        return api.put(`${USER_ADMIN_ENABLE_USER_URL}?userId=${userId}&isEnabled=${isEnabled}`, {}, {headers: authHeader()} );
    }


    // Public
    createPublicNormal(data) {
        return api.post(USER_PUBLIC_NORMAL_USER_SIGNUP_URL, data);
    }
    createPublicResearcher(data) {
        return api.post(USER_PUBLIC_RESEARCHER_SIGNUP_URL, data);
    }


    // update(id, data) {
    //     return api.put(`${PROJECTS_BY_STATUS_URL}/${id}`, data);
    // }

    // delete(id) {
    //     return api.delete(`${PROJECTS_BY_STATUS_URL}/${id}`);
    // }

}

export default new UserAdminService();
