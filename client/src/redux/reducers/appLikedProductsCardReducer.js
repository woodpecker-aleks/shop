import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Http } from '../../functions';
import { httpAddAuthHeaders } from '../../middleware/httpAddAuthHeaders';
import { httpValidateAuth } from '../../middleware/httpValidateAuth';
import { httpValidateStatus } from '../../middleware/httpValidateStatus';
import { callAlert } from './appAlertReducer';

export const likeProduct = createAsyncThunk('likedProductsCard/likeProduct', async (productId, {dispatch}) => {
  const res = await Http.get({
    url: `/api/product/like/${productId}`,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch), httpValidateAuth(dispatch)]
  });

  if (res.ok) dispatch( callAlert({ type: 'success', children: 'Liked new product' }) );

  return productId;
});

export const disslikeProduct = createAsyncThunk('likedProductsCard/disslikeProduct', async (productId, {dispatch}) => {
  await Http.delete({
    url: `/api/product/like/${productId}`,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch), httpValidateAuth(dispatch)]
  });

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