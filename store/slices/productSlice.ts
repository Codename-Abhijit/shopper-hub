import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
  reviews: Review[];
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  categories: string[];
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  categories: [],
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory(state, action) {
      const category = action.payload;
      state.filteredProducts = state.products.filter(product =>
        category === 'All' ? true : product.category === category
      );
    },
    setCategories(state, action) {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;

        const categories = Array.from(new Set(action.payload.map(product => product.category)));
        state.categories = ['All', ...categories];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'No Response from API';
      });
  },
});

export const { filterByCategory, setCategories } = productsSlice.actions;

export default productsSlice.reducer;
