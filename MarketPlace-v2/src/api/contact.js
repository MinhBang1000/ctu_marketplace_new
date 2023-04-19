import environment from '../environments/environment';
import axios from "axios";

export default axios.create({
    baseURL: environment.url.java,
});