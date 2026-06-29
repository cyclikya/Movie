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