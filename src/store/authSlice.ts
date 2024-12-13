import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';


interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<User>){
          state.user = action.payload;
        },
        clearAuth(state) {
            state.token = null;
            state.user = null;
        },
    },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setToken, setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
