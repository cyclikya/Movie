import { useEffect, useState } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/shared/ui/dropdown-menu';
import {
    useSearchMoviesQuery,
    useGetPopularFilmsQuery,
    useGetPopularSeriesQuery,
    useDiscoverQuery,
} from '@/features/movies/movies.api';
import SearchFilters from '@/features/movies/SearchFilters';
import MovieCard from '@/features/movies/MovieCard';
import MovieRow from '@/features/movies/MovieRow';
import type { MovieFilters } from '@/features/movies/movies.model';

const YEAR_MIN = 1950;
const YEAR_MAX = new Date().getFullYear();

const EMPTY_FILTERS: MovieFilters = {
    genres: [],
    countries: [],
    yearFrom: YEAR_MIN,
    yearTo: YEAR_MAX,
    ratingFrom: 0,
    ratingTo: 10,
};

const SORTS = [
    { value: 'RATING', label: 'По рейтингу' },
    { value: 'NUM_VOTE', label: 'По популярности' },
    { value: 'YEAR', label: 'По году' },
];

function countActive(f: MovieFilters): number {
    let n = f.genres.length + f.countries.length;
    if (f.yearFrom !== YEAR_MIN || f.yearTo !== YEAR_MAX) n += 1;
    if (f.ratingFrom !== 0 || f.ratingTo !== 10) n += 1;
    return n;
}

function SearchPage() {
    const [text, setText] = useState('');
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<MovieFilters>(EMPTY_FILTERS);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sort, setSort] = useState('RATING');

    useEffect(() => {
        const timer = setTimeout(() => setQuery(text.trim()), 400);
        return () => clearTimeout(timer);
    }, [text]);

    const activeCount = countActive(filters);
    const filtersActive = activeCount > 0;
    const hasKeyword = query.length >= 2;

    const useDiscover = filtersActive;
    const useKeyword = !filtersActive && hasKeyword;
    const showResults = useDiscover || useKeyword;

    const { data: discovered = [], isFetching: discovering } = useDiscoverQuery(
        { ...filters, keyword: hasKeyword ? query : undefined, order: sort },
        { skip: !useDiscover },
    );
    const { data: found = [], isFetching: searching } = useSearchMoviesQuery(query, {
        skip: !useKeyword,
    });
    const { data: films, isLoading: filmsLoading } = useGetPopularFilmsQuery();
    const { data: series, isLoading: seriesLoading } = useGetPopularSeriesQuery();

    const results = useDiscover ? discovered : found;
    const isFetching = useDiscover ? discovering : searching;
    const sortLabel = SORTS.find((s) => s.value === sort)?.label;

    return (
        <div className="space-y-6">
            <div className="pt-6 text-center">
                <h1 className="mb-5 text-2xl font-medium text-white">Что будем смотреть?</h1>

                <div className="mx-auto flex max-w-3xl items-center gap-2">
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Название фильма или сериала…"
                        className="h-11 flex-1 text-base"
                        autoFocus
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" className="h-11 w-48 gap-2" />}>
                            <ArrowUpDown className="size-4" />
                            {sortLabel}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                                {SORTS.map((s) => (
                                    <DropdownMenuRadioItem key={s.value} value={s.value}>
                                        {s.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="outline"
                        onClick={() => setFiltersOpen((o) => !o)}
                        className="h-11 gap-2"
                    >
                        <SlidersHorizontal className="size-4" />
                        Фильтры
                        {activeCount > 0 && (
                            <span className="rounded-full bg-primary px-1.5 text-xs text-white">
                                {activeCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            <div className="mx-auto max-w-3xl">
                <SearchFilters
                    value={filters}
                    onChange={setFilters}
                    onReset={() => setFilters(EMPTY_FILTERS)}
                    open={filtersOpen}
                    yearMin={YEAR_MIN}
                    yearMax={YEAR_MAX}
                />
            </div>

            {showResults && (
                <section>
                    <h2 className="mb-3 text-base font-medium text-white">
                        Результаты
                        {!isFetching && results.length > 0 && (
                            <span className="text-gray-500"> · {results.length}</span>
                        )}
                    </h2>

                    {isFetching ? (
                        <div className="flex flex-wrap gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-72 w-48 animate-pulse rounded-lg bg-secondary" />
                            ))}
                        </div>
                    ) : results.length === 0 ? (
                        <p className="text-sm text-gray-500">Ничего не найдено.</p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {results.map((m) => (
                                <MovieCard key={m.id} movie={m} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            <MovieRow title="Фильмы по вашим предпочтениям" movies={films} isLoading={filmsLoading} />
            <MovieRow title="Сериалы по вашим предпочтениям" movies={series} isLoading={seriesLoading} />
        </div>
    );
}

export default SearchPage;