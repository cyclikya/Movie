import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, MovieDetails, Actor } from './movies.model';


// --- форма элемента списка (popular / premieres) ---
type KinopoiskItem = {
    kinopoiskId: number;
    nameRu?: string | null;
    nameOriginal?: string | null;
    year: number;
    ratingKinopoisk?: number | null;
    posterUrlPreview: string;
    posterUrl?: string;
    coverUrl?: string | null;
    genres?: { genre: string }[];
    description?: string | null;
};

// --- форма одного фильма (по id) ---
type KinopoiskFilm = {
    kinopoiskId: number;
    nameRu?: string | null;
    nameOriginal?: string | null;
    year: number;
    ratingKinopoisk?: number | null;
    ratingImdb?: number | null;
    posterUrl: string;
    coverUrl?: string | null;
    description?: string | null;
    filmLength?: number | null;
    ratingAgeLimits?: string | null;
    countries?: { country: string }[];
    genres?: { genre: string }[];
};

type KinopoiskSimilar = {
    filmId: number;
    nameRu?: string | null;
    nameOriginal?: string | null;
    posterUrlPreview: string;
};

type KinopoiskStaff = {
    staffId: number;
    nameRu?: string | null;
    nameEn?: string | null;
    description?: string | null;
    posterUrl: string;
    professionKey: string;
};

function toMovie(item: KinopoiskItem): Movie {
    return {
        id: item.kinopoiskId,
        title: item.nameRu || item.nameOriginal || 'Без названия',
        year: item.year,
        rating: item.ratingKinopoisk ?? 0,
        poster: item.posterUrlPreview,
        cover: item.coverUrl || item.posterUrl || item.posterUrlPreview,
        genre: item.genres?.[0]?.genre ?? '',
        description: item.description ?? '',
    };
}

function toDetails(f: KinopoiskFilm): MovieDetails {
    return {
        id: f.kinopoiskId,
        title: f.nameRu || f.nameOriginal || 'Без названия',
        year: f.year,
        ratingKp: f.ratingKinopoisk ?? 0,
        ratingImdb: f.ratingImdb ?? 0,
        poster: f.posterUrl,
        cover: f.coverUrl || f.posterUrl,
        description: f.description ?? '',
        genres: (f.genres ?? []).map((g) => g.genre),
        countries: (f.countries ?? []).map((c) => c.country),
        ageLimit: f.ratingAgeLimits ? f.ratingAgeLimits.replace('age', '') + '+' : '',
        duration: f.filmLength ? `${Math.floor(f.filmLength / 60)}ч ${f.filmLength % 60}м` : '',
    };
}

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
    endpoints: (builder) => ({
        getPopular: builder.query<Movie[], void>({
            query: () => '/movies/popular',
            transformResponse: (response: { items: KinopoiskItem[] }) =>
                response.items.map(toMovie),
        }),
        getPremieres: builder.query<Movie[], { year: number; month: string }>({
            query: ({ year, month }) => `/movies/premieres?year=${year}&month=${month}`,
            transformResponse: (response: { items: KinopoiskItem[] }, _meta, arg) =>
                response.items
                    .filter((item) => item.year === arg.year)
                    .map(toMovie),
        }),
        getById: builder.query<MovieDetails, number>({
            query: (id) => `/movies/${id}`,
            transformResponse: (f: KinopoiskFilm) => toDetails(f),
        }),
        getSimilars: builder.query<Movie[], number>({
            query: (id) => `/movies/${id}/similars`,
            transformResponse: (response: { items: KinopoiskSimilar[] }) =>
                response.items.map((s) => ({
                    id: s.filmId,
                    title: s.nameRu || s.nameOriginal || 'Без названия',
                    year: 0,
                    rating: 0,
                    poster: s.posterUrlPreview,
                    cover: s.posterUrlPreview,
                    genre: '',
                    description: '',
                })),
        }),
        getStaff: builder.query<Actor[], number>({
            query: (id) => `/movies/${id}/staff`,
            transformResponse: (staff: KinopoiskStaff[]) =>
                staff
                    .filter((s) => s.professionKey === 'ACTOR')
                    .map((s) => ({
                        id: s.staffId,
                        name: s.nameRu || s.nameEn || 'Без имени',
                        role: s.description ?? '',
                        photo: s.posterUrl,
                    })),
        }),
        getTrailer: builder.query<string | null, number>({
            query: (id) => `/movies/${id}/videos`,
            transformResponse: (response: { items: { url: string }[] }) =>
                response.items[0]?.url ?? null,
        }),
    }),
});

export const {
    useGetPopularQuery,
    useGetPremieresQuery,
    useGetByIdQuery,
    useGetSimilarsQuery,
    useGetStaffQuery,
    useGetTrailerQuery,
} = moviesApi;