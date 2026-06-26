import MovieCard from './MovieCard';
import type { Movie } from './movies.model';

const TEST_MOVIES: Movie[] = [
    { id: 1, title: 'Начало', year: 2010, rating: 8.8 },
    { id: 2, title: 'Интерстеллар', year: 2014, rating: 8.6 },
    { id: 3, title: 'Бойцовский клуб', year: 1999, rating: 8.8 },
    { id: 4, title: 'Тёмный рыцарь', year: 2008, rating: 9.0 },
    { id: 5, title: 'Криминальное чтиво', year: 1994, rating: 8.9 },
    { id: 6, title: 'Матрица', year: 1999, rating: 8.7 },
];

type MovieRowProps = {
    title: string;
};

function MovieRow({ title }: MovieRowProps) {
    return (
        <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-medium text-white">{title}</h2>
                <span className="text-sm text-gray-400">Все ›</span>
            </div>
            <div className="flex gap-3 overflow-hidden">
                {TEST_MOVIES.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        year={movie.year}
                        rating={movie.rating}
                    />
                ))}
            </div>
        </section>
    );
}

export default MovieRow;