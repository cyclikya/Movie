import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseApiTags } from './tags';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    tagTypes: Object.values(BaseApiTags),
    endpoints: () => ({}),
});