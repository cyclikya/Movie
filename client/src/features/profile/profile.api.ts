import { baseApi } from '@/shared/api/baseApi';

export type ProfileStats = {
    friends: number;
    subscribers: number;
    planned: number;
    watching: number;
    watched: number;
};

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfileStats: builder.query<ProfileStats, void>({
            query: () => '/profile/stats',
        }),
    }),
});

export const { useGetProfileStatsQuery } = profileApi;