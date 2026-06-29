import MovieCard from './MovieCard';
import ScrollRow from '@/shared/components/ScrollRow';
import type { Movie } from './movies.model';

type MovieRowProps = {
    title: string;
    movies?: Movie[];
    isLoading?: boolean;
};

function MovieRow({ title, movies = [], isLoading = false }: MovieRowProps) {
    return (
        <ScrollRow title={title}>
            {isLoading
                ? Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="h-72 w-48 flex-none animate-pulse rounded-lg bg-elevated" />
                  ))
                : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </ScrollRow>
    );
}

export default MovieRow;