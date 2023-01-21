import {configureStore} from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer';
import { animeReducer } from './reducers/animeReducer';
import { otherReducer } from './reducers/otherReducer';
import { userReducer, profileReducer, subscriptionReducer } from './reducers/userReducer';



const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    anime: animeReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;

export const server = 'https://animetrix.onrender.com/api/v1';