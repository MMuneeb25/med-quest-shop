import api from './index';
import type { Product, Blog, AuthResponse, PaginatedData, Order, CreateOrderPayload, RewardsBalance } from '@shahmedical/types';

// ── Products ────────────────────────────────────────────────
export const productsApi = {
  getAll: (params?: { category?: string; brand?: string; search?: string; page?: number; limit?: number }) =>
    api.get<{ data: PaginatedData<Product> }>('/products', { params }),
  getById: (id: string) =>
    api.get<{ data: Product }>(`/products/${id}`),
  getFeatured: () =>
    api.get<{ data: Product[] }>('/products/featured'),
  getByCategory: (category: string) =>
    api.get<{ data: Product[] }>(`/products/category/${category}`),
};

// ── Blogs ───────────────────────────────────────────────────
export const blogsApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get<{ data: PaginatedData<Blog> }>('/blogs', { params }),
  getBySlug: (slug: string) =>
    api.get<{ data: Blog }>(`/blogs/${slug}`),
};

// ── Auth ────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ data: AuthResponse }>('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string) =>
    api.post<{ data: AuthResponse }>('/auth/register', { name, email, password }),
  logout: () =>
    api.post('/auth/logout'),
  refresh: () =>
    api.post<{ data: { accessToken: string } }>('/auth/refresh'),
  me: () =>
    api.get<{ data: AuthResponse['user'] }>('/auth/me'),
};

// ── Orders ──────────────────────────────────────────────────
export const ordersApi = {
  create: (payload: CreateOrderPayload) =>
    api.post<{ data: Order }>('/orders', payload),
  getMyOrders: () =>
    api.get<{ data: Order[] }>('/orders/my'),
  getById: (id: string) =>
    api.get<{ data: Order }>(`/orders/${id}`),
  cancel: (id: string) =>
    api.post<{ data: Order }>(`/orders/${id}/cancel`),
};

// ── Rewards ─────────────────────────────────────────────────
export const rewardsApi = {
  getBalance: () =>
    api.get<{ data: RewardsBalance }>('/rewards/balance'),
  redeem: (points: number) =>
    api.post<{ data: RewardsBalance }>('/rewards/redeem', { points }),
};

// ── Contact ─────────────────────────────────────────────────
export const contactApi = {
  submit: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
};

// ── Admin ───────────────────────────────────────────────────
export const adminApi = {
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),
  getUsers: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`),
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
    api.post('/admin/products', data),
  updateProduct: (id: string, data: Partial<Product>) =>
    api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) =>
    api.delete(`/admin/products/${id}`),
  getOrders: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, status: string) =>
    api.patch(`/admin/orders/${id}/status`, { status }),
  deleteOrder: (id: string) =>
    api.delete(`/admin/orders/${id}`),
};
