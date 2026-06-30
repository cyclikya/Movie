import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Review } from './reviews.model';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], number>({
            query: (kinopoiskId) => `/reviews/${kinopoiskId}`,
            providesTags: ['Reviews'],
        }),
        addReview: builder.mutation<unknown, { kinopoiskId: number; rating: number; text: string }>({
            query: (body) => ({ url: '/reviews', method: 'POST', body }),
            invalidatesTags: ['Reviews'],
        }),
    }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;