import api from '../api/auth';
import { LOGIN_URL, RESET_PASSWORD_URL } from '../environments/constraints';

class AuthService {
  
    login(data) {
        return api.post(LOGIN_URL, data);
    }
    
    sendResetPasswordCode(username) {
        return api.post(`${RESET_PASSWORD_URL}/${username}`, {});
    }
    
    verifyResetPasswordCode(username, code) {
        return api.get(`${RESET_PASSWORD_URL}/check-reset-code/${username}/${code}`);
    }
    
    updatePassword(data) {
        return api.post(`${RESET_PASSWORD_URL}/update-password`, data);
    }

}

export default new AuthService();
