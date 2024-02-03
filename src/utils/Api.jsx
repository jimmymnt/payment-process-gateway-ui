import axios from "axios";

let urls = {
  test: `http://localhost:3334`,
  development: 'https://dummyjson.com',
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