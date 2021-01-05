import { createSlice } from '@reduxjs/toolkit';

const appAlertSlice = createSlice({
  name: 'alert',
  initialState: {},
  reducers: {
    callAlert(state, action) {
      const { type = 'info', children, duration = 5000 } = action.payload;

      return {
        type,
        children,
        duration,
      }
    },
    clearAlert(state, action) {
      state.children = null;
    }
  }
});

export const { callAlert, clearAlert } = appAlertSlice.actions;

export default appAlertSlice.reducer;