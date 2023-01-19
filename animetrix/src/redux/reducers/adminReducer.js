import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    createAnimeRequest: state => {
      state.loading = true;
    },
    createAnimeSuccess: (state,action) => {
      state.loading = false;
        state.message = action.payload;
    },
    createAnimeFail: (state,action) => {
      state.loading = false;
        state.error = action.payload;
    },
  }
);