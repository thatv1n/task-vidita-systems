import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fakeapi',
});

export default instance;
