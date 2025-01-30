import Axios from 'axios';

export const API_URL = import.meta.env.API_URL || 'https://api.github.com';

export const api = Axios.create({
  baseURL: API_URL,
});
