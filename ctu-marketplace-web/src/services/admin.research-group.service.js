import api from '../api/admin.researchGroup';
import authHeader from './auth.header'
import { 
    RESEARCH_GROUP_ADMIN_URL, 
    RESEARCH_GROUP_ADMIN_ADD_MEMBER_URL, 
    RESEARCH_GROUP_ADMIN_ADD_OTHER_MEMBER_URL, 
    RESEARCH_GROUP_ADMIN_DELETE_MEMBER_URL,
    RESEARCH_GROUP_ADMIN_BY_USER_ID_URL,
    RESEARCH_GROUP_ADMIN_UPDATE_OTHER_MEMBER_URL 
} from '../environments/constraints';

class RoleAdminService {
  
    getAll() {
        return api.get(`${RESEARCH_GROUP_ADMIN_URL}`, {headers: authHeader()} );
    }
    
    getAllByUserId(id) {
        return api.get(`${RESEARCH_GROUP_ADMIN_BY_USER_ID_URL}/${id}`, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${RESEARCH_GROUP_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }

    create(data) {
        return api.post(RESEARCH_GROUP_ADMIN_URL, data, {headers: authHeader()} );
    }

    addMemberToGroup(data) {
        return api.post(RESEARCH_GROUP_ADMIN_ADD_MEMBER_URL, data, {headers: authHeader()} );
    }
    
    addOtherMemberToGroup(data) {
        return api.post(RESEARCH_GROUP_ADMIN_ADD_OTHER_MEMBER_URL, data, {headers: authHeader()} );
    }
    
    updateOtherMemberOfGroup(id, data) {
        return api.put(`${RESEARCH_GROUP_ADMIN_UPDATE_OTHER_MEMBER_URL}/${id}`, data, {headers: authHeader()} );
    }

    update(id, data) {
        return api.put(`${RESEARCH_GROUP_ADMIN_URL}/${id}`, data, {headers: authHeader()} );
    }

    delete(id) {
        return api.delete(`${RESEARCH_GROUP_ADMIN_URL}/${id}`, {headers: authHeader()} );
    }
    
    deleteMember(id) {
        return api.delete(`${RESEARCH_GROUP_ADMIN_DELETE_MEMBER_URL}/${id}`, {headers: authHeader()} );
    }

}

export default new RoleAdminService();
