import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Http } from '../../functions';
import { httpAddAuthHeaders } from '../../middleware/httpAddAuthHeaders';
import { httpValidateAuth } from '../../middleware/httpValidateAuth';
import { httpValidateStatus } from '../../middleware/httpValidateStatus';
import { setLikedProducts } from './appLikedProductsCardReducer';
import { setShopCardProducts } from './appShopCardReducer';

export const deleteFetchUser = createAsyncThunk('appUser/deleteFetchUser', async (some, {dispatch}) => {
  const res = await Http.delete({
    url: '/api/user',
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch), httpValidateAuth(dispatch)]
  });

  return res;
});

export const getFetchUser = createAsyncThunk('appUser/getFetchUser', async (some, {dispatch}) => {
  const res = await Http.get({
    url: '/api/user',
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch), httpValidateAuth(dispatch)]
  });

  const user = await res.json();

  dispatch( setLikedProducts(user.likedProducts) );
  dispatch( setShopCardProducts(user.card) );

  return user;
});

export const updateFetchUser = createAsyncThunk('appUser/updateFetchUser', async (newUserData, {dispatch}) => {
  const res = await Http.post({
    url: '/api/user',
    body: newUserData,
    requestMiddleware: [httpAddAuthHeaders],
    responseMiddleware: [httpValidateStatus(dispatch), httpValidateAuth(dispatch)]
  });

  const user = await res.json();

  dispatch( setLikedProducts(user.likedProducts) );
  dispatch( setShopCardProducts(user.card) );

  return user;
});

const appUserSlice = createSlice({
  name: 'appUser',
  initialState: {
    status: { isIdle: true },
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    avatar: null,
  },
  reducers: {},
  extraReducers: {
    [getFetchUser.pending]: (state, action) => {
      state.status = { isLoading: true };
    },
    [getFetchUser.fulfilled]: (state, action) => {
      const {
        avatar,
        phone,
        firstName,
        lastName,
        email,
      } = action.payload;
      
      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        status: { isSuccess: true }
      }
    },
    [getFetchUser.rejected]: (state, action) => {
      return { status: { isError: true, message: action.error.message }, error: action.error.message }
    },
    
    [updateFetchUser.pending]: (state, action) => {
      state.status = { isLoading: true };
    },
    [updateFetchUser.fulfilled]: (state, action) => {
      const {
        avatar,
        phone,
        firstName,
        lastName,
        email,
      } = action.payload;

      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        status: { isSuccess: true }
      }
    },
    [updateFetchUser.rejected]: (state, action) => {
      return { status: { isError: true, message: action.error.message }, error: action.error.message }
    },

    [deleteFetchUser.pending]: (state, action) => {
      state.status = { isLoading: true };
    },
    [deleteFetchUser.fulfilled]: (state, action) => {
      state.status = { isSuccess: true };
    },
    [deleteFetchUser.rejected]: (state, action) => {
      return { status: { isError: true, message: action.error.message }, error: action.error.message }
    },
  }
});

export default appUserSlice.reducer;