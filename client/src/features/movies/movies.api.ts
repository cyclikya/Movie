import { baseApi } from '@/shared/api/baseApi';
import type { Movie, MovieDetails, Actor, MoviePage, FilterOption, MovieFilters } from './movies.model';

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
        searchMovies: builder.query<Movie[], string>({
            query: (q) => `/movies/search?q=${encodeURIComponent(q)}`,
        }),
        getPopularFilms: builder.query<Movie[], void>({
            query: () => '/movies/films',
        }),
        getPopularSeries: builder.query<Movie[], void>({
            query: () => '/movies/series',
        }),
        getFilters: builder.query<{ genres: FilterOption[]; countries: FilterOption[] }, void>({
            query: () => '/movies/filters',
        }),
        discover: builder.query<Movie[], MovieFilters & { keyword?: string; order?: string }>({
            query: (f) => {
                const q = new URLSearchParams();
                f.genres.forEach((id) => q.append('genres', String(id)));
                f.countries.forEach((id) => q.append('countries', String(id)));
                q.set('yearFrom', String(f.yearFrom));
                q.set('yearTo', String(f.yearTo));
                q.set('ratingFrom', String(f.ratingFrom));
                q.set('ratingTo', String(f.ratingTo));
                if (f.keyword) q.set('keyword', f.keyword);
                q.set('order', f.order ?? 'RATING');
                return `/movies/discover?${q.toString()}`;
            },
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
    useSearchMoviesQuery,
    useGetPopularFilmsQuery,
    useGetPopularSeriesQuery,
    useGetFiltersQuery,
    useDiscoverQuery,
} = moviesApi;