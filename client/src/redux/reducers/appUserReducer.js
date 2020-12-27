import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DELETE, ERROR, GET, IDLE, LOADING, POST, SUCCESS } from '../../constants';

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
      const { avatar, phone, firstName, lastName, email } = action.payload;

      state.avatar = avatar;
      state.phone = phone;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.status = SUCCESS;
    },
    [getFetchUser.rejected]: (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    },
    
    [updateFetchUser.pending]: (state, action) => {
      state.status = LOADING;
    },
    [updateFetchUser.fulfilled]: (state, action) => {
      const { avatar, phone, firstName, lastName, email } = action.payload;

      state.avatar = avatar;
      state.phone = phone;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.status = SUCCESS;
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
    },
    [deleteFetchUser.rejected]: (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    },
  }
});

export default appUserSlice.reducer;