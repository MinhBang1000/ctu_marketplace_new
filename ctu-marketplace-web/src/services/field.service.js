import api from '../api/field';
import { FIELD_PUBLIC_URL, FIELD_RESEARCHER_URL } from '../environments/constraints';
import authHeader from './auth.header';

class FieldService {
  
    getAll() {
        return api.get(`${FIELD_RESEARCHER_URL}`, {headers: authHeader()} );
    }
   
    getAllPublicFields() {
        return api.get(`${FIELD_PUBLIC_URL}`, {headers: authHeader()} );
    }
    
    // getById(id) {
    //     return api.get(`${FIELD_RESEARCHER_URL}/${id}`);
    // }

    // create(data) {
    //     return api.post(FIELD_RESEARCHER_URL, data);
    // }

    // update(id, data) {
    //     return api.put(`${FIELD_RESEARCHER_URL}/${id}`, data);
    // }

    // delete(id) {
    //     return api.delete(`${FIELD_RESEARCHER_URL}/${id}`);
    // }

}

export default new FieldService();
