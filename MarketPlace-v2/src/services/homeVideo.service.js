import api from '../api/homeVideo';
import { HOME_VIDEO_URL } from '../environments/constraints';

class HomeVideoService {
  
    getById(id) {
        return api.get(`${HOME_VIDEO_URL}/${id}`);
    }
}

export default new HomeVideoService();
