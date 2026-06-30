import { baseApi } from '@/shared/api/baseApi';
import type { AuthResponse, AuthRequest } from './auth.model';

export const authApi = baseApi.injectEndpoints({
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