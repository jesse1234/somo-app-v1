import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-somo.dataposit.co.ke/',
});

export default instance;