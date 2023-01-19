import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    getAllUsersRequest: state => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createAnimeRequest: state => {
      state.loading = true;
    },
    createAnimeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createAnimeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAnimeRequest: state => {
      state.loading = true;
    },
    deleteAnimeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteAnimeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addEpisodeRequest: state => {
      state.loading = true;
    },
    addEpisodeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addEpisodeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteEpisodeRequest: state => {
      state.loading = true;
    },
    deleteEpisodeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteEpisodeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);