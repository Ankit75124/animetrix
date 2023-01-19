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
