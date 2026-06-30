import { baseApi } from '@/shared/api/baseApi';

type Friend = { id: number; email: string };

export const friendsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFriends: builder.query<Friend[], void>({
            query: () => '/friends',
        }),
    }),
});

export const { useGetFriendsQuery } = friendsApi;