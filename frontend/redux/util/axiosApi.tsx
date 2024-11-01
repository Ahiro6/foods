import axios from 'axios';

// Create axios instance with custom config
const deRoot = "http://localhost:5000"
const prRoot = 'https://foods-kk5o.onrender.com'

const api = axios.create({
  baseURL: prRoot,
});

export default api;