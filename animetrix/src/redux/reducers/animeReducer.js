import { createReducer } from '@reduxjs/toolkit';


export const animeReducer = createReducer({animes:[]}, {

    allAnimeRequest: (state) => {
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
});