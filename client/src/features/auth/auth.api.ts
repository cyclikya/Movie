import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, AuthRequest } from './auth.model';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (body) => ({ url: '/login', method: 'POST', body }),
        }),
        registration: builder.mutation<AuthResponse, AuthRequest>({
            query: (body) => ({ url: '/registration', method: 'POST', body }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({ url: '/logout', method: 'POST' }),
        }),
    }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi;