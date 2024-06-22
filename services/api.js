import { BASE_URL } from '@/utils/url';
import axios from 'axios';

export default axios.create({
  baseURL: BASE_URL //https://lambdaa-backend.onrender.com
});