import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://628cb9aaa3fd714fd0382055.mockapi.io',
});

export default instance;
