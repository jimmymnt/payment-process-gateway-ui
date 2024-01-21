import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDJmOWE3MDItODVmOS00N2MwLThjN2MtZTk4MmJlNjUwM2UxIiwiaWF0IjoxNzA1ODE5ODYxLCJleHAiOjE3MDU4MjM0NjF9.mZaVSSh7iQmFaDhtQwbeHRyKZWnBonh9HBKAe9bIVy8";
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);

export default axiosInstance;