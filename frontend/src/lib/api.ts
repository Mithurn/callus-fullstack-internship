import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const authData = JSON.parse(authStorage);
      const token = authData.state?.token || null;
      
      if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Adding auth token to request:', token.substring(0, 10) + '...');
      } else {
        console.log('No valid token found in storage');
      }
    } else {
      console.log('No auth storage found');
    }
  } catch (error) {
    console.error('Error reading auth token:', error);
    // Clear corrupted auth storage
    localStorage.removeItem('auth-storage');
  }
  
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.log('Unauthorized request, clearing auth storage and redirecting to login');
      localStorage.removeItem('auth-storage');
      // Only redirect if we're not already on the login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string, role?: string) =>
    api.post('/auth/register', { email, password, name, role }),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: { name?: string; phone?: string }) =>
    api.put('/users/profile', data),
};

export const quotationsAPI = {
  getAll: () => api.get('/quotations'),
  getOne: (id: number) => api.get(`/quotations/${id}`),
  create: (data: { title: string; description: string; amount: number }) =>
    api.post('/quotations', data),
  update: (id: number, data: { title?: string; description?: string; amount?: number }) => api.put(`/quotations/${id}`, data),
  delete: (id: number) => api.delete(`/quotations/${id}`),
};

export const consultationsAPI = {
  getAll: () => api.get('/consultations'),
  getOne: (id: number) => api.get(`/consultations/${id}`),
  create: (data: { title: string; description: string; scheduledAt?: Date }) =>
    api.post('/consultations', data),
  update: (id: number, data: { title?: string; description?: string; scheduledAt?: Date }) => api.put(`/consultations/${id}`, data),
  delete: (id: number) => api.delete(`/consultations/${id}`),
}; 