import { server } from '../store';
import axios from 'axios';



export const getAllAnimes = (category="", keyword="") => async dispatch => {
  try {
    dispatch({ type: 'allAnimeRequest' });

    const { data } = await axios.get(
      `${server}/animes?keyword=${keyword}&category=${category}`,
    );

    dispatch({ type: 'allAnimeSuccess', payload: data.animes });
  } catch (error) {
    dispatch({
      type: 'allAnimeFail',
      payload: error.response.data.message,
    });
  }
};


