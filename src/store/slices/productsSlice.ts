import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  featured?: boolean;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    brand: string;
    searchQuery: string;
  };
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    brand: 'all',
    searchQuery: '',
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilter: (
      state,
      action: PayloadAction<{ key: 'category' | 'brand' | 'searchQuery'; value: string } | { key: 'priceRange'; value: [number, number] }>
    ) => {
      if (action.payload.key === 'priceRange') {
        state.filters.priceRange = action.payload.value;
      } else {
        state.filters[action.payload.key] = action.payload.value;
      }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setProducts, setLoading, setError, setFilter, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
