import { useState } from 'react';
import type { ReactElement } from 'react';
import { PreviewCard } from '@base-ui/react/preview-card';
import ScrollRow from '@/shared/components/ScrollRow';
import { cn } from '@/shared/lib/utils';
import type { Actor } from './movies.model';

// заглушка Кинопоиска «нет фото» — PNG ровно 208×304
const PLACEHOLDER_W = 208;
const PLACEHOLDER_H = 304;

const actorPreview = PreviewCard.createHandle<ReactElement>();

function ActorPhoto({
    name,
    photo,
    className,
}: {
    name: string;
    photo: string;
    className?: string;
}) {
    const [noPhoto, setNoPhoto] = useState(false);

    if (noPhoto) {
        return (
            <div className={cn('flex items-center justify-center font-medium text-white', className, 'bg-gray-900')}>
                {name[0]?.toUpperCase() ?? '?'}
            </div>
        );
    }

    return (
        <img
            src={photo}
            alt={name}
            className={className}
            onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth === PLACEHOLDER_W && img.naturalHeight === PLACEHOLDER_H) {
                    setNoPhoto(true);
                }
            }}
            onError={() => setNoPhoto(true)}
        />
    );
}

function actorPayload(a: Actor): ReactElement {
    return (
        <div className="w-56">
            <ActorPhoto
                name={a.name}
                photo={a.photo}
                className="h-72 w-full rounded-lg bg-elevated object-cover text-2xl"
            />
            <p className="mt-2 text-sm font-medium text-white">{a.name}</p>
            <p className="text-xs text-gray-400">{a.role}</p>
        </div>
    );
}

type ActorsProps = {
    actors?: Actor[];
    isLoading?: boolean;
};

function Actors({ actors = [], isLoading = false }: ActorsProps) {
    const [open, setOpen] = useState(false);
    const [triggerId, setTriggerId] = useState<string | null>(null);

    const handleOpenChange = (
        isOpen: boolean,
        eventDetails: PreviewCard.Root.ChangeEventDetails,
    ) => {
        setOpen(isOpen);
        setTriggerId(eventDetails.trigger?.id ?? null);
    };

    if (!isLoading && actors.length === 0) return null;

    return (
        <>
            <ScrollRow title="Актёры">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                          <div
                              key={i}
                              className="h-[72px] w-[72px] flex-none animate-pulse rounded-full bg-elevated"
                          />
                      ))
                    : actors.map((a) => (
                          <PreviewCard.Trigger
                              key={a.id}
                              handle={actorPreview}
                              id={String(a.id)}
                              payload={actorPayload(a)}
                              render={<div />}
                              className="w-[84px] flex-none cursor-pointer text-center"
                          >
                              <ActorPhoto
                                  name={a.name}
                                  photo={a.photo}
                                  className="mx-auto h-[72px] w-[72px] rounded-full bg-elevated object-cover text-sm"
                              />
                              <p className="mt-2 truncate text-xs text-white">{a.name}</p>
                              <p className="truncate text-[11px] text-gray-500">{a.role}</p>
                          </PreviewCard.Trigger>
                      ))}
            </ScrollRow>

            <PreviewCard.Root
                handle={actorPreview}
                open={open}
                onOpenChange={handleOpenChange}
                triggerId={triggerId}
            >
                {({ payload }) => (
                    <PreviewCard.Portal>
                        <PreviewCard.Positioner sideOffset={8}>
                            <PreviewCard.Popup className="z-50 rounded-xl border border-white/10 bg-panel p-3 shadow-2xl">
                                {payload}
                            </PreviewCard.Popup>
                        </PreviewCard.Positioner>
                    </PreviewCard.Portal>
                )}
            </PreviewCard.Root>
        </>
    );
}

export default Actors;
