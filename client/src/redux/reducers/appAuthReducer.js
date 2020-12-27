import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
  const data = JSON.parse(localStorage.getItem('userData'));

  if (data && data.token) {
    return ({
      token: data.token,
      userId: data.userId,
      isAuth: true
    });
  } else {
    return ({
      token: null,
      userId: null,
      isAuth: false
    });
  }
}

const appAuthSlice = createSlice({
  name: 'appAuth',
  initialState: initialState(),
  reducers: {
    login(state, action) {
      const { token, userId } = action.payload;

      localStorage.setItem('userData', JSON.stringify({ token, userId }));

      state.token = token;
      state.userId = userId;
      state.isAuth = true;
    },
    logout(state, action) {
      localStorage.removeItem('userData');

      state.token = null;
      state.userId = null;
      state.isAuth = false;
    }
  }
});

export const { login, logout } = appAuthSlice.actions;

export default appAuthSlice.reducer;