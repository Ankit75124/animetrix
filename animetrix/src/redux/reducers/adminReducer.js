import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    getAdminStatsRequest: state => {
      state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.usersCount = action.payload.usersCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.usersProfit = action.payload.usersProfit;
    },
    getAdminStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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

    deleteUsersRequest: state => {
      state.loading = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserRoleRequest: state => {
      state.loading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUserRoleFail: (state, action) => {
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
