import { useRef } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';

type ScrollRowProps = {
    title: string;
    children: ReactNode;
};

function ScrollRow({ title, children }: ScrollRowProps) {
    const ref = useRef<HTMLDivElement>(null);

    const scroll = (dir: number) => {
        ref.current?.scrollBy({ left: dir * 500, behavior: 'smooth' });
    };

    return (
        <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-medium text-white">{title}</h2>
                <div className="flex gap-2">
                    <Button size="icon-sm" variant="secondary" onClick={() => scroll(-1)} aria-label="Назад">
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button size="icon-sm" variant="secondary" onClick={() => scroll(1)} aria-label="Вперёд">
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
            <div ref={ref} className="flex gap-3 overflow-x-auto no-scrollbar">
                {children}
            </div>
        </section>
    );
}

export default ScrollRow;