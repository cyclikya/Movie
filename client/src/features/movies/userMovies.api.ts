import { baseApi } from '@/shared/api/baseApi';
import type { MyMovie, MyMovieCard } from './movies.model';
import { BaseApiTags } from '@/shared/api/tags';

export const userMoviesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyList: builder.query<MyMovie[], void>({
            query: () => '/my-movies',
            providesTags: [BaseApiTags.MyMovies],
        }),
        addToList: builder.mutation<unknown, { kinopoiskId: number; status: string }>({
            query: (body) => ({ url: '/my-movies', method: 'POST', body }),
            invalidatesTags: [BaseApiTags.MyMovies],
        }),
        getMyListFull: builder.query<MyMovieCard[], void>({
            query: () => '/my-movies/full',
            providesTags: [BaseApiTags.MyMovies],
        }),
    }),
});

export const { useGetMyListQuery, useAddToListMutation, useGetMyListFullQuery } = userMoviesApi;