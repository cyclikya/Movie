import { Link } from 'react-router-dom';
import type { Movie } from './movies.model';
import { useMovieListInfo } from './useMovieListInfo';
import { getStatusRibbon } from '@/shared/lib/list-ribbon';

type MovieCardProps = {
    movie: Movie;
    showRibbon?: boolean;
};

function MovieCard({ movie, showRibbon = true }: MovieCardProps) {
    const info = useMovieListInfo(movie.id);
    const ribbon = showRibbon && info ? getStatusRibbon(info.status) : null;

    return (
        <Link to={`/movie/${movie.id}`} className="w-48 flex-none">
            <div className="relative h-72 overflow-hidden rounded-lg bg-elevated">
                {ribbon && (
                    <div
                        className="absolute left-0 top-2 z-10 rounded-r-md px-2 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: ribbon.color }}
                    >
                        {ribbon.label}
                        {info!.status === 'watched' && info!.rating ? ` · ${info!.rating}` : ''}
                    </div>
                )}
                <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
                {movie.rating > 0 && (
                    <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-amber-300">
                        {movie.rating}
                    </span>
                )}
            </div>
            <h3 className="mt-2 truncate text-sm font-medium text-white">{movie.title}</h3>
            {movie.year > 0 && <p className="text-xs text-gray-400">{movie.year}</p>}
        </Link>
    );
}

export default MovieCard;