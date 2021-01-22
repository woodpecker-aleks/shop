import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Http, array } from '../../functions';
import { httpAddAuthHeaders } from '../../middleware/httpAddAuthHeaders';
import { httpValidateStatus } from '../../middleware/httpValidateStatus';
import { callAlert } from './appAlertReducer';

export const clearProductCart = createAsyncThunk('appShopCard/clearProductCart', async (some, {dispatch}) => {
  const res = await Http.delete({
    url: '/api/card',
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch)]
  });

  return;
});

export const addProductToCard = createAsyncThunk('appShopCard/addProduct', async (productId, {dispatch}) => {
  const res = await Http.get({
    url: `/api/card/${productId}`,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch)]
  });

  if (res.ok) dispatch( callAlert({ type: 'success', children: 'Added new product to cart' }));
  
  const newProduct = await res.json();

  return newProduct;
});

export const removeProductFromCard = createAsyncThunk('appShopCard/removeProduct', async (productId, {dispatch}) => {
  await Http.delete({
    url: `/api/card/${productId}`,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch)]
  });

  return productId;
});

export const setProductCountFromCard = createAsyncThunk('appShopCard/setProductCount', async ({ productId, count }, {dispatch}) => {
  if (count < 0) count = 0;

  await Http.get({
    url: `/api/card/${productId}/${count}`,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch)]
  });

  return { productId, count };
});

const appShopCardSlice = createSlice({
  name: 'appShopCard',
  initialState: {
    products: [],
    notifications: 0,
  },
  reducers: {
    setShopCardProducts(state, action) {
      const products = action.payload.map(prod => ({ id: prod.id, info: prod.product, count: prod.count }));
      
      state.products = products;
    },

    clearNotifications(state, action) {
      state.notifications = 0;
    },
  },
  extraReducers: {
    [addProductToCard.fulfilled]: (state, action) => {
      const newProduct = action.payload;
      const match = state.products.find(product => product.id === newProduct._id);

      if (!match) {
        state.products.push({ id: newProduct._id, count: 1, info: newProduct });
        state.notifications++;
      }
    },

    [removeProductFromCard.fulfilled]: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      
      if (state.notifications > 0) state.notifications--;
    },

    [setProductCountFromCard.fulfilled]: (state, action) => {
      const { productId, count } = action.payload;

      state.products = array.modify(state.products, { id: productId }, { count });
    },

    [clearProductCart.fulfilled]: (state, action) => {
      state.products = [];
    }
  }
});

export const { setShopCardProducts, clearNotifications } = appShopCardSlice.actions;

export default appShopCardSlice.reducer;