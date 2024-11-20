import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../store/eventSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        events: eventsReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
