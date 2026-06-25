import { useAppSelector } from '@/app/hooks';
import Hero from '@/features/movies/Hero';
import MovieRow from '@/features/movies/MovieRow';
import RegisterCta from '@/features/auth/RegisterCta';

function HomePage() {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div>
            <Hero
                title="Интерстеллар"
                year="2014"
                genre="Фантастика"
                rating="8.6"
                description="Команда исследователей отправляется через червоточину в космосе, чтобы найти человечеству новый дом среди звёзд."
            />
            <MovieRow title="Популярное" />
            <MovieRow title="Новинки" />
            {user ? (
                <MovieRow title="Рекомендации для тебя" />
            ) : (
                <RegisterCta />
            )}
        </div>
    );
}

export default HomePage;