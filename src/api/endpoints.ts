import api from './index';
import { Product } from '@/store/slices/productsSlice';

export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getFeatured: () => api.get<Product[]>('/products/featured'),
  getByCategory: (category: string) => api.get<Product[]>(`/products/category/${category}`),
  getLuckyDraw: () => api.get<Product[]>('/lucky-draw'),
};

export const blogsApi = {
  getAll: () => api.get('/blogs'),
  getById: (id: string) => api.get(`/blogs/${id}`),
};

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  signup: (email: string, password: string, name: string) => api.post('/auth/signup', { email, password, name }),
  logout: () => api.post('/auth/logout'),
};

export const contactApi = {
  submit: (data: any) => api.post('/contact', data),
};
