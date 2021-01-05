import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERROR, IDLE, LOADING, SUCCESS } from '../../constants';
import { Http } from '../../functions';

export const addProductToCard = createAsyncThunk('appUser/addProductToCard', async () => {
  
});

export const deleteFetchUser = createAsyncThunk('appUser/deleteFetchUser', async () => {
  return await Http.delete('/api/user');
});

export const getFetchUser = createAsyncThunk('appUser/getFetchUser', async () => {
  return await Http.get('/api/user');
});

export const updateFetchUser = createAsyncThunk('appUser/updateFetchUser', async (newUserData) => {
  return await Http.post('/api/user', newUserData, { reqData: 'form' });
});

export const likeProduct = createAsyncThunk('appUser/likeProduct', async (productId) => {
  Http.get(`/api/product/like/${productId}`, { resData: 'status' });

  return productId;
});

export const disslikeProduct = createAsyncThunk('appUser/disslikeProduct', async (productId) => {
  Http.delete(`/api/product/like/${productId}`, { resData: 'status' });

  return productId;
});

const appUserSlice = createSlice({
  name: 'appUser',
  initialState: {
    status: IDLE,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    avatar: null,
    likedProducts: [],
    card: []
  },
  reducers: {},
  extraReducers: {
    [getFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [getFetchUser.fulfilled]: (state, action) => {
      const {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        likedProducts,
        card
      } = action.payload;
      
      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        likedProducts,
        card,
        status: SUCCESS
      }
    },
    [getFetchUser.rejected]: (state, action) => {
      return { status: ERROR, error: action.error.message }
    },
    
    [updateFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [updateFetchUser.fulfilled]: (state, action) => {
      const {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        likedProducts,
        card,
      } = action.payload;

      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        likedProducts,
        card,
        status: SUCCESS
      }
    },
    [updateFetchUser.rejected]: (state, action) => {
      return { status: ERROR, error: action.error.message }
    },

    [deleteFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [deleteFetchUser.fulfilled]: (state, action) => {
      state.status = SUCCESS;
    },
    [deleteFetchUser.rejected]: (state, action) => {
      return { status: ERROR, error: action.error.message }
    },

    [likeProduct.fulfilled]: (state, action) => {
      state.likedProducts.push(action.payload);
    },

    [disslikeProduct.fulfilled]: (state, action) => {
      state.likedProducts = state.likedProducts.filter(product => product !== action.payload);
    }
  }
});

export const likedProductSelector = (store, productId) => {
  if (store.appUser.status === SUCCESS) return Boolean(store.appUser.likedProducts?.find(product => product === productId));
  else return false;
};

export default appUserSlice.reducer;