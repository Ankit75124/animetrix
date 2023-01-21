import { server } from '../store';
import axios from 'axios';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'contactRequest' });

    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      config
    );

    dispatch({ type: 'contactSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    });
  }
};


export const animeRequest = (name, email, anime) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    dispatch({ type: 'animeRequestRequest' });

    const { data } = await axios.post(
      `${server}/animerequest`,
      {
        name,
        email,
        anime,
      },
      config
    );

    dispatch({ type: 'animeRequestSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'animeRequestFail',
      payload: error.response.data.message,
    });
  }
};
