import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Http, array } from '../../functions';
import { callAlert } from './appAlertReducer';

export const addProductToCard = createAsyncThunk('appShopCard/addProduct', async (productId, {dispatch}) => {
  const res = await Http.get(`/api/card/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

export const removeProductFromCard = createAsyncThunk('appShopCard/removeProduct', async (productId, {dispatch}) => {
  const res = await Http.delete(`/api/card/${productId}`, { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );

  return productId;
});

export const setProductCountFromCard = createAsyncThunk('appShopCard/setProductCount', async ({ productId, count }, {dispatch}) => {
  if (count < 0) count = 0;

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
      const products = action.payload.map(prod => ({ id: prod._id, count: prod.count }));
      state.products = products;
    },

    clearNotifications(state, action) {
      state.notifications = 0;
    }
  },
  extraReducers: {
    [addProductToCard.fulfilled]: (state, action) => {
      state.products.push({ id: action.payload, count: 1 });
      state.notifications++;
    },

    [removeProductFromCard.fulfilled]: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      if (state.notifications > 0) state.notifications--;
    },

    [setProductCountFromCard.fulfilled]: (state, action) => {
      const { productId, count } = action.payload;

      state.products = array.modify(state.products, { id: productId }, { count });
    }
  }
});

export const { setShopCardProducts, clearNotifications } = appShopCardSlice.actions;

export default appShopCardSlice.reducer;