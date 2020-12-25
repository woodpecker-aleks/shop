import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DELETE, ERROR, GET, IDLE, LOADING, POST, SUCCESS } from '../constants';

export const deleteFetchUser = createAsyncThunk('appUser/deleteFetchUser', async (token) => {
  const res = await fetch('/api/user', {
    method: DELETE,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res;
})

export const getFetchUser = createAsyncThunk('appUser/getFetchUser', async (token) => {
  const res = await fetch('/api/user', {
    method: GET,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const user = await res.json();

  return user;
});

export const updateFetchUser = createAsyncThunk('appUser/updateFetchUser', async (newUserData) => {
  const res = await fetch('/api/user', {
    method: POST,
    headers: {
      Authorization: `Bearer ${newUserData.token}`
    },
    body: newUserData.formData
  });

  const updatedUser = await res.json();

  return updatedUser;
});

const initialState = {
  status: IDLE
}

const appUserSlice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {},
  extraReducers: {
    [getFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [getFetchUser.fulfilled]: (state, action) => {
      const { firstName, lastName, phone, email, avatar } = action.payload;

      state.status = SUCCESS;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phone = phone;
      state.email = email;
      state.avatar = avatar;
    },
    [getFetchUser.rejected]: (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    },
    
    [updateFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [updateFetchUser.fulfilled]: (state, action) => {
      const { firstName, lastName, phone, email, avatar } = action.payload;

      state.status = SUCCESS;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phone = phone;
      state.email = email;
      state.avatar = avatar;
    },
    [updateFetchUser.rejected]: (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    },

    [deleteFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [deleteFetchUser.fulfilled]: (state, action) => {

      state.status = SUCCESS;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.email = null;
      state.avatar = null;
    },
    [deleteFetchUser.rejected]: (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    },
  }
});

export default appUserSlice.reducer;