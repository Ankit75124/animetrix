import {configureStore} from '@reduxjs/toolkit';
import { animeReducer } from './reducers/animeReducer';
import { userReducer, profileReducer } from './reducers/userReducer';



const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        anime: animeReducer,
    },
});

export default store;

export const server = 'https://animetrix.onrender.com/api/v1';