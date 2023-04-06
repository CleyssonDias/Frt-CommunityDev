import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:4444/api/v1/'
});

export { api }