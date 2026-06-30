import { baseApi } from '@/shared/api/baseApi';
import type { Review } from './reviews.model';
import { BaseApiTags } from '@/shared/api/tags';

export const reviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], number>({
            query: (kinopoiskId) => `/reviews/${kinopoiskId}`,
            providesTags: [BaseApiTags.Reviews],
        }),
        addReview: builder.mutation<unknown, { kinopoiskId: number; rating: number; text: string }>({
            query: (body) => ({ url: '/reviews', method: 'POST', body }),
            invalidatesTags: [BaseApiTags.Reviews, BaseApiTags.MyMovies],
        }),
    }),
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;