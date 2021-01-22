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
      const newCurrency = action.payload;

      localStorage.setItem('currency', newCurrency);

      return newCurrency;
    }
  }
});

export const { switchCurrency } = appCurrencySlice.actions;

export default appCurrencySlice.reducer;