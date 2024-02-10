import axios from "axios";

let urls = {
  development: 'http://localhost:3000/api/v1/',
  production: 'https://your-production-url.com/'
}

const api = axios.create({
  baseURL: urls.development,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;