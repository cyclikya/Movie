import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './auth.model';

type AuthState = {
    user: User | null;
};

const saved = localStorage.getItem('user');

const initialState: AuthState = {
    user: saved ? JSON.parse(saved) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;