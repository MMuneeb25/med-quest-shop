import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productsApi } from '@/api/endpoints';

interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const PRODUCTS_QUERY_KEYS = {
  all: ['products'] as const,
  list: (filters: ProductFilters) => ['products', 'list', filters] as const,
  detail: (id: string) => ['products', 'detail', id] as const,
  featured: ['products', 'featured'] as const,
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.list(filters),
    queryFn: () => productsApi.getAll(filters).then((r) => r.data.data),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.featured,
    queryFn: () => productsApi.getFeatured().then((r) => r.data.data),
    staleTime: 10 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEYS.detail(id),
    queryFn: () => productsApi.getById(id).then((r) => r.data.data),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
