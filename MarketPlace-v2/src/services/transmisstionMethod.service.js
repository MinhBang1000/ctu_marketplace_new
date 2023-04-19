import api from '../api/transmisstionMethod';
import authHeader from './auth.header'
import { TRANSMISSION_URL } from '../environments/constraints';

class TransmisstionMethodService {
  
    getAll() {
        return api.get(TRANSMISSION_URL, {headers: authHeader()});
    }
    
    // getById(id) {
    //     return api.get(`${TRANSMISSION_URL}/${id}`);
    // }

    // create(data) {
    //     return api.post(TRANSMISSION_URL, data);
    // }

    // update(id, data) {
    //     return api.put(`${TRANSMISSION_URL}/${id}`, data);
    // }

    // delete(id) {
    //     return api.delete(`${TRANSMISSION_URL}/${id}`);
    // }

}

export default new TransmisstionMethodService();
