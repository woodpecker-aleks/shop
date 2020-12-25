import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
}

const appMenuSlice = createSlice({
  name: 'appMenu',
  initialState,
  reducers: {
    openAppMenu(state, action) {
      state.isOpen = true;
    },
    closeAppMenu(state, action) {
      state.isOpen = false;
    },
    toggleAppMenu(state, action) {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { openAppMenu, closeAppMenu, toggleAppMenu } = appMenuSlice.actions;

export default appMenuSlice.reducer;