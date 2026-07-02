export type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
    poster: string;
    cover: string;
    genre: string;
    description: string;
    premiere?: string;
};

export type MovieDetails = {
    id: number;
    title: string;
    year: number;
    ratingKp: number;
    ratingImdb: number;
    poster: string;
    cover: string;
    description: string;
    genres: string[];
    countries: string[];
    ageLimit: string;
    duration: string;
};

export type Actor = {
    id: number;
    name: string;
    role: string;
    photo: string;
};

export type MyMovie = {
    kinopoiskId: number;
    status: string;
    rating: number | null;
};

export type MoviePage = {
    movie: MovieDetails;
    similars: Movie[];
    actors: Actor[];
    trailer: string | null;
};

export type MyMovieCard = Movie & {
    status: 'planned' | 'watching' | 'watched';
    userRating: number | null;
};

export type FilterOption = { id: number; name: string };

export type MovieFilters = {
    genres: number[];
    countries: number[];
    yearFrom: number;
    yearTo: number;
    ratingFrom: number;
    ratingTo: number;
};