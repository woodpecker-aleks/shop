import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: localStorage.getItem('userTheme') ?? 'light'
}

const appThemeSlice = createSlice({
  name: 'appTheme',
  initialState,
  reducers: {
    toggleAppTheme(state, action) {
      if (state.type === 'light') {
        localStorage.setItem('userTheme', 'dark');
        state.type = 'dark';
      } else {
        localStorage.setItem('userTheme', 'light');
        state.type = 'light';
      }
    }
  }
});

export const { toggleAppTheme } = appThemeSlice.actions;

export default appThemeSlice.reducer;