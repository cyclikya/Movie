import { useAppSelector } from '@/shared/hooks/hooks';
import { useGetPopularQuery, useGetPremieresQuery } from '@/features/movies/movies.api';
import Hero from '@/features/movies/Hero';
import MovieRow from '@/features/movies/MovieRow';
import RegisterCta from '@/features/auth/RegisterCta';

const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

function HomePage() {
    const user = useAppSelector((state) => state.auth.user);

    const { data: popular, isLoading: popularLoading } = useGetPopularQuery();
    const now = new Date();
    const { data: premieres, isLoading: premieresLoading } = useGetPremieresQuery({
        year: now.getFullYear(),
        month: MONTHS[now.getMonth()],
    });

    const heroMovie = popular?.[0];
    const restPopular = popular?.slice(1);

    return (
        <div>
            <Hero movie={heroMovie} />
            <MovieRow title="Популярное" movies={restPopular} isLoading={popularLoading} />
            <MovieRow title="Новинки" movies={premieres} isLoading={premieresLoading} />
            {user ? (
                <MovieRow title="Рекомендации для тебя" />
            ) : (
                <RegisterCta />
            )}
        </div>
    );
}

export default HomePage;