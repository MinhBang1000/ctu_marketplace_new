import api from '../api/status';
import authHeader from './auth.header'
import { STATUS_RESEARCHER_URL } from '../environments/constraints';

class StatusService {
  
    getAll() {
        return api.get(STATUS_RESEARCHER_URL, {headers: authHeader()} );
    }
}

export default new StatusService();
