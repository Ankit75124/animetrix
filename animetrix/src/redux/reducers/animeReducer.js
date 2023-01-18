import { createReducer } from '@reduxjs/toolkit';


export const animeReducer = createReducer(
  { animes: [], episodes: [] },
  {
    allAnimeRequest: state => {
      state.loading = true;
    },
    allAnimeSuccess: (state, action) => {
      state.loading = false;
      state.animes = action.payload;
    },
    allAnimeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAnimeRequest: state => {
      state.loading = true;
    },
    getAnimeSuccess: (state, action) => {
      state.loading = false;
      state.episodes = action.payload;
    },
    getAnimeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.animes = action.payload;
    },
    addToPlaylistFail: (state, action) => {
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