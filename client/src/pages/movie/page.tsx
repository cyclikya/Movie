import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMoviePageQuery } from '@/features/movies/movies.api';
import { useAddToListMutation } from '@/features/movies/userMovies.api';
import { useMovieListInfo } from '@/features/movies/useMovieListInfo';
import { getStatusRibbon } from '@/shared/lib/list-ribbon';
import MovieRow from '@/features/movies/MovieRow';
import Actors from '@/features/movies/Actors';
import Reviews from '@/features/reviews/Reviews';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
} from '@/shared/ui/menubar';
import { useToast } from '@/shared/ui/toast-context';

function Poster({ src, title }: { src: string; title: string }) {
    const [broken, setBroken] = useState(!src || src.includes('no-poster'));

    if (broken) {
        return (
            <div className="flex h-[340px] w-[225px] flex-none items-center justify-center rounded-xl bg-elevated text-5xl font-medium text-gray-500">
                {title[0]?.toUpperCase() ?? '?'}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={title}
            onError={() => setBroken(true)}
            className="h-[340px] w-[225px] flex-none rounded-xl object-cover"
        />
    );
}

function MoviePage() {
    const { id } = useParams();
    const filmId = Number(id);
    const { data, isLoading } = useGetMoviePageQuery(filmId, { skip: !id });

    const [addToList] = useAddToListMutation();
    const { success, error } = useToast();
    const listInfo = useMovieListInfo(filmId);
    const listLabel = listInfo ? getStatusRibbon(listInfo.status)?.label ?? 'В список' : 'В список';

    const handleAdd = async (status: string) => {
        try {
            await addToList({ kinopoiskId: filmId, status }).unwrap();
            success('Добавлено в список');
        } catch {
            error('Войдите, чтобы добавить в список');
        }
    };

    if (isLoading || !data) {
        return <div className="h-96 animate-pulse rounded-xl bg-elevated" />;
    }

    const { movie, similars, actors, trailer } = data;

    return (
        <div>
            <div className="flex gap-6">
                <Poster src={movie.poster} title={movie.title} />
                <div className="flex-1">
                    <h1 className="text-2xl font-medium text-white">
                        {movie.title} <span className="font-normal text-gray-500">({movie.year})</span>
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {movie.genres.map((g) => (
                            <Badge key={g} variant="secondary">{g}</Badge>
                        ))}
                        {movie.ageLimit && <Badge variant="outline">{movie.ageLimit}</Badge>}
                        {movie.duration && <span className="text-xs text-gray-400">{movie.duration}</span>}
                    </div>

                    <div className="mt-3 flex gap-2">
                        {movie.ratingKp > 0 && <Badge className="bg-amber-500/15 text-amber-300">★ КП {movie.ratingKp}</Badge>}
                        {movie.ratingImdb > 0 && <Badge variant="secondary">IMDb {movie.ratingImdb}</Badge>}
                    </div>

                    <p className="mt-3 text-sm text-gray-400">{movie.countries.join(', ')}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">{movie.description}</p>

                    <div className="mt-5 flex items-center gap-3">
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    {listLabel}
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => handleAdd('planned')}>Посмотрю {listInfo?.status === 'planned' && '✓'}</MenubarItem>
                                    <MenubarItem onClick={() => handleAdd('watching')}>Смотрю {listInfo?.status === 'watching' && '✓'}</MenubarItem>
                                    <MenubarItem onClick={() => handleAdd('watched')}>Посмотрел {listInfo?.status === 'watched' && '✓'}</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>

                        <Button
                            variant="secondary"
                            disabled={!trailer}
                            onClick={() => trailer && window.open(trailer, '_blank')}
                        >
                            Трейлер
                        </Button>
                    </div>
                </div>
            </div>

            <Actors actors={actors} />
            <MovieRow title="Похожие фильмы" movies={similars} />
            <Reviews kinopoiskId={filmId} />
        </div>
    );
}

export default MoviePage;