import { Collapsible } from '@base-ui/react/collapsible';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Toggle } from '@base-ui/react/toggle';
import { Slider } from '@base-ui/react/slider';
import { Combobox } from '@base-ui/react/combobox';
import { useGetFiltersQuery } from './movies.api';
import type { MovieFilters, FilterOption } from './movies.model';
import { Button } from '@/shared/ui/button';

type Props = {
    value: MovieFilters;
    onChange: (next: MovieFilters) => void;
    onReset: () => void;
    open: boolean;
    yearMin: number;
    yearMax: number;
};

function SearchFilters({ value, onChange, onReset, open, yearMin, yearMax }: Props) {
    const { data: dict } = useGetFiltersQuery();
    const genres = dict?.genres ?? [];
    const countries = dict?.countries ?? [];
    const selectedCountries = countries.filter((c) => value.countries.includes(c.id));

    return (
        <Collapsible.Root open={open}>
            <Collapsible.Panel className="mt-3 rounded-xl border border-white/10 bg-card p-4">
                <p className="mb-2 text-sm text-gray-400">Жанры</p>
                <ToggleGroup
                    value={value.genres.map(String)}
                    onValueChange={(v: string[]) => onChange({ ...value, genres: v.map(Number) })}
                    className="mb-4 flex flex-wrap gap-2"
                >
                    {genres.map((g) => (
                        <Toggle
                            key={g.id}
                            value={String(g.id)}
                            className="rounded-full border border-white/10 bg-secondary px-3 py-1.5 text-sm text-gray-300 data-[pressed]:border-primary data-[pressed]:bg-primary data-[pressed]:text-white"
                        >
                            {g.name}
                        </Toggle>
                    ))}
                </ToggleGroup>

                <div className="grid grid-cols-3 gap-10">
                    <div>
                        <p className="mb-2 text-sm text-gray-400">Страны</p>
                        <Combobox.Root
                            items={countries}
                            multiple
                            value={selectedCountries}
                            onValueChange={(items: FilterOption[]) =>
                                onChange({ ...value, countries: items.map((i) => i.id) })
                            }
                            itemToStringLabel={(i: FilterOption) => i.name}
                        >
                            <Combobox.Chips className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-secondary p-1.5">
                                {selectedCountries.map((c) => (
                                    <Combobox.Chip
                                        key={c.id}
                                        className="flex items-center gap-1 rounded bg-surface px-2 py-0.5 text-xs text-white"
                                    >
                                        {c.name}
                                        <Combobox.ChipRemove className="text-gray-400">×</Combobox.ChipRemove>
                                    </Combobox.Chip>
                                ))}
                                <Combobox.Input
                                    placeholder="поиск страны…"
                                    className="flex-1 bg-transparent px-1 text-sm text-white outline-none"
                                />
                            </Combobox.Chips>
                            <Combobox.Portal>
                                <Combobox.Positioner className="z-50" sideOffset={4}>
                                    <Combobox.Popup className="mt-2 thin-scroll max-h-60 w-(--anchor-width) overflow-auto rounded-lg border border-white/10 bg-card p-1 shadow-xl">
                                        <Combobox.Empty className="p-2 text-sm text-gray-500">Ничего не найдено</Combobox.Empty>
                                        <Combobox.List>
                                            {(country: FilterOption) => (
                                                <Combobox.Item
                                                    key={country.id}
                                                    value={country}
                                                    className="cursor-pointer rounded px-2 py-1.5 text-sm text-white data-[highlighted]:bg-secondary"
                                                >
                                                    {country.name}
                                                </Combobox.Item>
                                            )}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                    </div>

                    <div>
                        <div className="mb-3 flex justify-between text-sm text-gray-400">
                            <span>Год</span>
                            <span className="text-gray-200">{value.yearFrom} — {value.yearTo}</span>
                        </div>
                        <Slider.Root
                            min={yearMin}
                            max={yearMax}
                            value={[value.yearFrom, value.yearTo]}
                            onValueChange={(v) => {
                                const [from, to] = v as number[];
                                onChange({ ...value, yearFrom: from, yearTo: to });
                            }}
                        >
                            <Slider.Control className="flex h-4 items-center">
                                <Slider.Track className="relative h-1 w-full rounded bg-secondary">
                                    <Slider.Indicator className="rounded bg-primary" />
                                    <Slider.Thumb className="size-4 rounded-full bg-white" />
                                    <Slider.Thumb className="size-4 rounded-full bg-white" />
                                </Slider.Track>
                            </Slider.Control>
                        </Slider.Root>
                    </div>

                    <div>
                        <div className="mb-3 flex justify-between text-sm text-gray-400">
                            <span>Рейтинг</span>
                            <span className="text-gray-200">{value.ratingFrom} — {value.ratingTo}</span>
                        </div>
                        <Slider.Root
                            min={0}
                            max={10}
                            step={0.5}
                            value={[value.ratingFrom, value.ratingTo]}
                            onValueChange={(v) => {
                                const [from, to] = v as number[];
                                onChange({ ...value, ratingFrom: from, ratingTo: to });
                            }}
                        >
                            <Slider.Control className="flex h-4 items-center">
                                <Slider.Track className="relative h-1 w-full rounded bg-secondary">
                                    <Slider.Indicator className="rounded bg-primary" />
                                    <Slider.Thumb className="size-4 rounded-full bg-white" />
                                    <Slider.Thumb className="size-4 rounded-full bg-white" />
                                </Slider.Track>
                            </Slider.Control>
                        </Slider.Root>
                    </div>
                </div>

                <div className="mt-4 flex justify-end border-t border-white/10 pt-3">
                    <Button variant="ghost" onClick={onReset}>Сбросить</Button>
                </div>
            </Collapsible.Panel>
        </Collapsible.Root>
    );
}

export default SearchFilters;