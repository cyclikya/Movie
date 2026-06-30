import { useGetMyListQuery } from './userMovies.api';
import type { MyMovie } from './movies.model';
import { useAuthUser } from '@/features/auth/auth.hooks';

export function useMovieListInfo(kinopoiskId: number): MyMovie | undefined {
    const user = useAuthUser();
    const { data: list } = useGetMyListQuery(undefined, { skip: !user });
    return list?.find((i) => i.kinopoiskId === kinopoiskId);
}