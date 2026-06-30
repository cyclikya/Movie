import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Friend = { id: number; email: string };

export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFriends: builder.query<Friend[], void>({
            query: () => '/friends',
        }),
    }),
});

export const { useGetFriendsQuery } = friendsApi;