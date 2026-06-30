import { useNavigate } from 'react-router-dom';
import type { Movie } from './movies.model';
import { Button } from '@/shared/ui/button';

type HeroProps = {
    movie?: Movie;
};

function Hero({ movie }: HeroProps) {
    const navigate = useNavigate();

    if (!movie) {
        return <div className="h-60 animate-pulse rounded-xl bg-elevated" />;
    }

    return (
        <section
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="relative flex h-60 cursor-pointer flex-col justify-end overflow-hidden rounded-xl p-6 transition hover:brightness-110"
            style={{
                backgroundImage: `url(${movie.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
            <div className="relative max-w-xl">
                <h2 className="text-2xl font-medium text-white">{movie.title}</h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-300">
                    <span>{movie.year}</span>
                    {movie.genre && <span>{movie.genre}</span>}
                    {movie.rating > 0 && <span className="text-amber-300">★ {movie.rating}</span>}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">{movie.description}</p>
                <div className="mt-3 flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <Button>Смотреть трейлер</Button>
                    <Button variant="secondary">В список</Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;