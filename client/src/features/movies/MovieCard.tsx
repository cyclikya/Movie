type MovieCardProps = {
    title: string;
    year: number;
    rating: number;
};

function MovieCard({ title, year, rating }: MovieCardProps) {
    return (
        <article className="w-48 flex-none">
            <div className="relative h-72 rounded-lg bg-elevated">
                <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-amber-300">
                    {rating}
                </span>
            </div>
            <h3 className="mt-2 truncate text-sm font-medium text-white">{title}</h3>
            <p className="text-xs text-gray-400">{year}</p>
        </article>
    );
}

export default MovieCard;