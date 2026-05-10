import axios from "axios";

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://kruthanyasarees.onrender.com',
});

export default api;
