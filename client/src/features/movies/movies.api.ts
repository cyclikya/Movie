import { baseApi } from '@/shared/api/baseApi';
import type { Movie, MovieDetails, Actor, MoviePage} from './movies.model';

export const moviesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMoviePage: builder.query<MoviePage, number>({
            query: (id) => `/movies/${id}/full`,
        }),
        getPopular: builder.query<Movie[], void>({
            query: () => '/movies/popular',
        }),
        getPremieres: builder.query<Movie[], { year: number; month: string }>({
            query: ({ year, month }) => `/movies/premieres?year=${year}&month=${month}`,
        }),
        getById: builder.query<MovieDetails, number>({
            query: (id) => `/movies/${id}`,
        }),
        getSimilars: builder.query<Movie[], number>({
            query: (id) => `/movies/${id}/similars`,
        }),
        getStaff: builder.query<Actor[], number>({
            query: (id) => `/movies/${id}/staff`,
        }),
        getTrailer: builder.query<string | null, number>({
            query: (id) => `/movies/${id}/videos`,
        }),
    }),
});

export const {
    useGetMoviePageQuery,
    useGetPopularQuery,
    useGetPremieresQuery,
    useGetByIdQuery,
    useGetSimilarsQuery,
    useGetStaffQuery,
    useGetTrailerQuery,
} = moviesApi;