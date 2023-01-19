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