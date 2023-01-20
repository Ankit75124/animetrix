import { server } from '../store';
import axios from 'axios';

export const createAnime = formData => async dispatch => {
  try {
    dispatch({ type: 'createAnimeRequest' });

    const { data } = await axios.post(`${server}/createanime`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'createAnimeSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createAnimeFail',
      payload: error.response.data.message,
    });
  }
};


export const deleteAnime = (id) => async dispatch => {
  try {
    dispatch({ type: 'deleteAnimeRequest' });

    const { data } = await axios.delete(`${server}/anime/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteAnimeSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteAnimeFail',
      payload: error.response.data.message,
    });
  }
};

export const addEpisode = (id,formData) => async dispatch => {
  try {
    dispatch({ type: 'addEpisodeRequest' });

    const { data } = await axios.post(`${server}/anime/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'addEpisodeSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addEpisodeFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteEpisode = (animeId, episodeId) => async dispatch => {
  try {
    dispatch({ type: 'deleteEpisodeRequest' });

    const { data } = await axios.delete(`${server}/episode?animeId=${animeId}&episodeId=${episodeId}`,
    
    {

      withCredentials: true,
    });

    dispatch({ type: 'deleteEpisodeSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteEpisodeFail',
      payload: error.response.data.message,
    });
  }
};


export const getAllUsers = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAllUsersRequest' });

    const { data } = await axios.get(`${server}/admin/users`, config);

    dispatch({ type: 'getAllUsersSuccess', payload: data.user });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = (id) => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'updateUserRoleRequest' });

    const { data } = await axios.put(`${server}/admin/user/${id}`,{}, config);

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteUsersRequest' });

    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch({ type: 'deleteUsersSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'getAdminStatsRequest' });

    const { data } = await axios.get(`${server}/admin/stats`, config);

    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};