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


export const getAnimeEpisodes = id => async dispatch => {
  try {
    dispatch({ type: 'getAnimeRequest' });

    const { data } = await axios.get(`${server}/anime/${id}`, {

      withCredentials: true,
    });

    dispatch({ type: 'getAnimeSuccess', payload: data.episodes });
  } catch (error) {
    dispatch({
      type: 'getAnimeFail',
      payload: error.response.data.message,
    });
  }
};


