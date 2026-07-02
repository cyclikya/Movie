import { useOutletContext } from 'react-router-dom';
import { Tabs } from '@base-ui/react/tabs';
import { useGetMyListFullQuery } from '@/features/movies/userMovies.api';
import { useGetProfileStatsQuery } from '@/features/profile/profile.api';
import { useAuthUser } from '@/features/auth/auth.hooks';
import { getAvatarColor } from '@/shared/lib/avatar-color';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import MovieCard from '@/features/movies/MovieCard';
import type { LayoutContext } from '@/shared/components/Layout';
import type { MyMovieCard } from '@/features/movies/movies.model';

const SECTIONS: { status: MyMovieCard['status']; title: string }[] = [
    { status: 'planned', title: 'Посмотрю' },
    { status: 'watching', title: 'Смотрю' },
    { status: 'watched', title: 'Просмотрено' },
];

function Stat({ value, label }: { value: number; label: string }) {
    return (
        <div className="text-center">
            <div className="text-lg font-semibold text-white">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
        </div>
    );
}

function ProfilePage() {
    const user = useAuthUser();
    const { openAuth } = useOutletContext<LayoutContext>();
    const { data: movies, isLoading } = useGetMyListFullQuery(undefined, { skip: !user });
    const { data: stats } = useGetProfileStatsQuery(undefined, { skip: !user });

    if (!user) {
        return (
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-2xl bg-panel p-10 text-center">
                <h1 className="text-xl font-medium text-white">Личный кабинет</h1>
                <p className="text-sm text-gray-400">
                    Войди или зарегистрируйся, чтобы вести свои списки фильмов, писать отзывы и следить за друзьями.
                </p>
                <Button onClick={openAuth}>Войти или зарегистрироваться</Button>
            </div>
        );
    }

    if (isLoading) {
        return <div className="h-40 animate-pulse rounded-xl bg-elevated" />;
    }

    const list = movies ?? [];
    const name = user.email.split('@')[0];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6 rounded-2xl bg-panel p-6">
                <Avatar className="size-20 text-2xl">
                    <AvatarFallback
                        style={{ backgroundColor: getAvatarColor(user.id) }}
                        className="text-white"
                    >
                        {user.email[0]?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <h1 className="text-2xl font-medium text-white">{name}</h1>
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <div className="flex gap-8">
                    <Stat value={stats?.friends ?? 0} label="Друзья" />
                    <Stat value={stats?.subscribers ?? 0} label="Подписчики" />
                    <Stat value={stats?.watching ?? 0} label="Смотрю" />
                    <Stat value={stats?.watched ?? 0} label="Просмотрено" />
                </div>
            </div>

            <Tabs.Root defaultValue="planned">
                <Tabs.List className="relative flex gap-1 border-b border-white/10">
                    {SECTIONS.map((section) => (
                        <Tabs.Tab
                            key={section.status}
                            value={section.status}
                            className="cursor-pointer px-4 py-2 text-sm text-gray-400 outline-none transition-colors data-[selected]:text-white"
                        >
                            {section.title}{' '}
                            <span className="text-gray-600">
                                {list.filter((m) => m.status === section.status).length}
                            </span>
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator className="absolute bottom-0 left-[var(--active-tab-left)] h-0.5 w-[var(--active-tab-width)] bg-primary transition-all duration-200" />
                </Tabs.List>

                {SECTIONS.map((section) => {
                    const items = list.filter((m) => m.status === section.status);
                    return (
                        <Tabs.Panel key={section.status} value={section.status} className="pt-5">
                            {items.length === 0 ? (
                                <p className="text-sm text-gray-500">Пусто</p>
                            ) : (
                                <div className="flex flex-wrap gap-3">
                                    {items.map((m) => (
                                        <MovieCard key={m.id} movie={m} showRibbon={false} />
                                    ))}
                                </div>
                            )}
                        </Tabs.Panel>
                    );
                })}
            </Tabs.Root>
        </div>
    );
}

export default ProfilePage;