import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {},
  reducers: {
    incrementCounter(state, action) {
      if (!state[action.payload]) state[action.payload] = 0;

      state[action.payload]++
    },
    decrementCounter(state, action) {
      if (!state[action.payload]) state[action.payload] = 0;

      state[action.payload]--
    },
    clearCounter(state, action) {
      delete state[action.payload];
    },
    setCounter(state, action) {
      const { newValue, counter } = action.payload;

      state[counter] = newValue;
    },
  }
});

export const counterSelector = (store, counterName) => store.counter[counterName];

export const { incrementCounter, decrementCounter, clearCounter, setCounter } = counterSlice.actions;

export default counterSlice.reducer;