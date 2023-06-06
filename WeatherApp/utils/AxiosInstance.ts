import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'http://api.weatherapi.com/v1/forecast.json?key=9dc146c3f5304b4f907111106230506&q=',
    timeout:5000,
    headers:{'X-Custom-Header': 'foobar'}
});

export default axiosInstance;