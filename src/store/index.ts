import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import eventsReducer from '../store/eventSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    events: eventsReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['events','auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Ignore warnings about serializable state
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;