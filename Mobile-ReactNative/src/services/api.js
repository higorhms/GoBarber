import axios from 'axios';
import { apiUrl } from '~/config/constants';

const api = axios.create({
    baseURL: apiUrl,
});

export default api;
