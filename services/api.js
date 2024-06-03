import axios from 'axios';

export default axios.create({
  baseURL: "http://192.168.100.28:8000" //https://lambdaa-backend.onrender.com
});