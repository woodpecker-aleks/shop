import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Http } from '../../functions';
import { callAlert } from './appAlertReducer';

export const addProductToCard = createAsyncThunk('appShopCard/addProduct', async (productId, dispatch) => {
  const res = await Http.get(`/api/card/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

export const removeProductFromCard = createAsyncThunk('appShopCard/removeProduct', async (productId, dispatch) => {
  const res = await Http.delete(`/api/card/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

export const setProductCountFromCard = createAsyncThunk('appShopCard/setProductCount', async (productId, count, dispatch) => {
  const res = await Http.get(`/api/card/${productId}/${count}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return { productId, count };
});

const appShopCardSlice = createSlice({
  name: 'appShopCard',
  initialState: {
    products: [],
    notifications: 0
  },
  reducers: {
    setShopCardProducts(state, action) {
      state.products = action.payload;
    },

    clearNotifications(state, action) {
      state.notifications = 0;
    }
  },
  extraReducers: {
    [addProductToCard.fulfilled]: (state, action) => {
      state.products.push({ product: action.payload, count: 1 });
      state.notifications++;
    },

    [removeProductFromCard.fulfilled]: (state, action) => {
      state.products.filter(product => product.product !== action.payload);
      if (state.notifications > 0) state.notifications--;
    },

    [setProductCountFromCard.fulfilled]: (state, action) => {
      const { productId, count } = action.payload;

      const productIndex = state.products.findIndex(product => product.product === productId);
      state.products[productIndex] = { product: productId, count }
    }
  }
});

export const { setShopCardProducts, clearNotifications } = appShopCardSlice.actions;

export default appShopCardSlice.reducer;