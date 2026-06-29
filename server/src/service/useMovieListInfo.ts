import { useAppSelector } from '@/shared/hooks/hooks';
import { useGetMyListQuery } from './userMovies.api';

export function useMovieListInfo(kinopoiskId: number) {
    const user = useAppSelector((s) => s.auth.user);
    const { data: list } = useGetMyListQuery(undefined, { skip: !user });
    return list?.find((i) => i.kinopoiskId === kinopoiskId);
}