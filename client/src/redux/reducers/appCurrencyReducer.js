import { createSlice } from '@reduxjs/toolkit';
import { DOLLAR } from '../../constants';

const initialState = () => {
  const currency = localStorage.getItem('currency');

  if (currency) return currency;
  else return DOLLAR;
}

const appCurrencySlice = createSlice({
  name: 'currency',
  initialState: initialState(),
  reducers: {
    switchCurrency(state, action) {
      localStorage.setItem('currency', action.payload);
      return action.payload;
    }
  }
});

export const { switchCurrency } = appCurrencySlice.actions;

export default appCurrencySlice.reducer;