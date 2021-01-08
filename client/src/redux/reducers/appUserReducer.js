import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Http } from '../../functions';
import { callAlert } from './appAlertReducer';
import { logout } from './appAuthReducer';
import { setLikedProducts } from './appLikedProductsCardReducer';

export const deleteFetchUser = createAsyncThunk('appUser/deleteFetchUser', async () => {
  return await Http.delete('/api/user');
});

export const getFetchUser = createAsyncThunk('appUser/getFetchUser', async (dispatch) => {
  const res = await Http.get('/api/user', { resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );
  if (res.status === 401) dispatch( logout() );

  const user = await res.json();

  dispatch( setLikedProducts(user.likedProducts) );

  return user;
});

export const updateFetchUser = createAsyncThunk('appUser/updateFetchUser', async (newUserData, dispatch) => {
  const res = await Http.post('/api/user', newUserData, { reqData: 'form', resData: 'res' });

  if (!res.ok) dispatch( callAlert({ type: 'error', children: Http.translateStatus(res.status) }) );
  if (res.status === 401) dispatch( logout() );

  return await res.json();
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
    card: []
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
        card
      } = action.payload;
      
      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        card,
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
        card,
      } = action.payload;

      return {
        avatar,
        phone,
        firstName,
        lastName,
        email,
        card,
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