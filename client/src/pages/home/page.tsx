import { useAppSelector } from '@/shared/hooks/hooks';
import { Hero, MovieRow } from '@/features/movies';
import { RegisterCta } from '@/features/auth';

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