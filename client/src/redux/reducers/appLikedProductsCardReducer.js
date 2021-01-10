import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { callAlert } from './appAlertReducer';
import { Http } from '../../functions';

export const likeProduct = createAsyncThunk('likedProductsCard/likeProduct', async (productId, {dispatch}) => {
  const res = await Http.get(`/api/product/like/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

export const disslikeProduct = createAsyncThunk('likedProductsCard/disslikeProduct', async (productId, {dispatch}) => {
  const res = await Http.delete(`/api/product/like/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

const appLikedProductsCardSlice = createSlice({
  name: 'likedProductsCard',
  initialState: {
    likedProducts: [],
    notifications: 0
  },
  reducers: {
    setLikedProducts(state, action) {
      state.likedProducts = action.payload;
    },
    
    clearNotifications(state, action) {
      state.notifications = 0;
    }
  },
  extraReducers: {
    [likeProduct.fulfilled]: (state, action) => {
      state.likedProducts.push(action.payload);
      state.notifications++;
    },

    [disslikeProduct.fulfilled]: (state, action) => {
      state.likedProducts = state.likedProducts.filter(product => product !== action.payload);
      if (state.notifications !== 0) state.notifications--;
    }
  }
});

export const likedProductSelector = (store, productId) => {
  if (store.likedProductsCard.likedProducts.length) return Boolean(store.likedProductsCard.likedProducts.find(product => product === productId));
  else return false;
};

export const { setLikedProducts, clearNotifications } = appLikedProductsCardSlice.actions;

export default appLikedProductsCardSlice.reducer;