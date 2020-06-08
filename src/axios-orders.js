import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-ca259.firebaseio.com/'
});

export default instance;