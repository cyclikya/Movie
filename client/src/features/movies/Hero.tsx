type HeroProps = {
    title: string;
    year: string;
    genre: string;
    rating: string;
    description: string;
};

function Hero({ title, year, genre, rating, description }: HeroProps) {
    return (
        <section className="flex h-60 flex-col justify-end gap-3 rounded-xl bg-elevated p-6">
            <h2 className="text-2xl font-medium text-white">{title}</h2>
            <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{year}</span>
                <span>{genre}</span>
                <span className="text-amber-300">★ {rating}</span>
            </div>
            <p className="max-w-xl text-sm text-gray-300">{description}</p>
            <div className="mt-1 flex gap-3">
                <button className="rounded-lg bg-accent px-5 py-2 text-sm text-white">
                    Смотреть трейлер
                </button>
                <button className="rounded-lg bg-card px-5 py-2 text-sm text-white">
                    В список
                </button>
            </div>
        </section>
    );
}

export default Hero;