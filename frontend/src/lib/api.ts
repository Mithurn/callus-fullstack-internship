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
  const token = localStorage.getItem('auth-storage') 
    ? JSON.parse(localStorage.getItem('auth-storage')!).state.token 
    : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
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