import axios from 'axios';

const instance = axios.create({
baseURL: 'http://localhost:3001/api',
withCredentials: true
});

instance.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

instance.interceptors.response.use(
(response) => response,
(error) => {
if (!error.response) {
    console.error('Network Error:', error.message);
    return Promise.reject(new Error('Network Error: Unable to connect to server'));
}

switch (error.response.status) {
    case 401:
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
    break;
    case 403:
    console.error('Access Denied:', error.response.data?.message || 'You do not have permission to access this resource');
    break;
    case 500:
    console.error('Server Error:', error.response.data?.message || 'An unexpected server error occurred');
    break;
    default:
    console.error('Request Error:', error.response.data?.message || 'An error occurred while processing your request');
}

return Promise.reject(error.response?.data || error);
}
);

export default instance;

