import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type MyMovie = { kinopoiskId: number; status: string; rating: number | null };

export const userMoviesApi = createApi({
    reducerPath: 'userMoviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['MyMovies'],
    endpoints: (builder) => ({
        getMyList: builder.query<MyMovie[], void>({
            query: () => '/my-movies',
            providesTags: ['MyMovies'],
        }),
        addToList: builder.mutation<unknown, { kinopoiskId: number; status: string }>({
            query: (body) => ({ url: '/my-movies', method: 'POST', body }),
            invalidatesTags: ['MyMovies'],
        }),
    }),
});

export const { useGetMyListQuery, useAddToListMutation } = userMoviesApi;