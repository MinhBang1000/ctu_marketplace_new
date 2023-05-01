import api from '../api/faq';
import { FAQ_URL } from '../environments/constraints';

class FaqService {
  
    getAll() {
        return api.get(FAQ_URL);
    }
    
    // getById(id) {
    //     return api.get(`${FAQ_URL}/${id}`);
    // }

    // create(data) {
    //     return api.post(FAQ_ADMIN_URL, data);
    // }

    // update(id, data) {
    //     return api.put(`${FAQ_ADMIN_URL}/${id}`, data);
    // }

    // delete(id) {
    //     return api.delete(`${FAQ_ADMIN_DELETE_URL}/${id}`);
    // }

}

export default new FaqService();
