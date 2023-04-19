import api from '../api/developmentLevel';
import authHeader from './auth.header'
import { LEVEL_URL, } from '../environments/constraints';

class DevelopmentLevelService {
  
    getAll() {
        return api.get(LEVEL_URL, {headers: authHeader()} );
    }
    
    getById(id) {
        return api.get(`${LEVEL_URL}/${id}`);
    }

    create(data) {
        return api.post(LEVEL_URL, data);
    }

    update(id, data) {
        return api.put(`${LEVEL_URL}/${id}`, data);
    }

    delete(id) {
        return api.delete(`${LEVEL_URL}/${id}`);
    }

}

export default new DevelopmentLevelService();
