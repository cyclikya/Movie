import { useState } from 'react';
import { useGetReviewsQuery, useAddReviewMutation } from './reviews.api';
import { useGetFriendsQuery } from '@/features/friends/friends.api';
import { useAuthUser } from '@/features/auth/auth.hooks';
import { useToast } from '@/shared/ui/toast-context';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import type { Review } from './reviews.model';
import { getAvatarColor } from '@/shared/lib/avatar-color';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="rounded-xl border border-white/5 bg-panel p-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarFallback
                        style={{ backgroundColor: getAvatarColor(review.userId) }}
                        className="text-xs text-white"
                    >
                        {review.email?.[0]?.toUpperCase() ?? '?'}
                    </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm text-white">{review.email}</span>
                <span className="text-xs text-amber-300">★ {review.rating}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{review.text}</p>
        </div>
    );
}

function Reviews({ kinopoiskId }: { kinopoiskId: number }) {
    const user = useAuthUser();
    const { data: reviews = [] } = useGetReviewsQuery(kinopoiskId);
    const { data: friends = [] } = useGetFriendsQuery(undefined, { skip: !user });
    const [addReview, { isLoading }] = useAddReviewMutation();
    const { success, error } = useToast();


    const [rating, setRating] = useState('8');
    const [text, setText] = useState('');

    const friendIds = new Set(friends.map((f) => f.id));
    const friendReviews = reviews.filter((r) => friendIds.has(r.userId));
    const otherReviews = reviews.filter((r) => !friendIds.has(r.userId));

    const submit = async () => {
        try {
            await addReview({ kinopoiskId, rating: Number(rating), text }).unwrap();

            setText('');
            success('Отзыв опубликован');
        } catch {
            error('Не удалось опубликовать отзыв');
        }
    };

    return (
        <section className="mt-8">
            <h2 className="mb-3 text-base font-medium text-white">Отзывы</h2>

            {user && (
                <div className="mb-5 rounded-xl border border-white/5 bg-panel p-4">
                    <div className="flex items-center gap-3">
                        <Input
                            type="number"
                            min={1}
                            max={10}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-16"
                        />
                        <span className="text-xs text-gray-400">оценка 1–10</span>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ваш отзыв…"
                        className="mt-3 h-20 w-full resize-none rounded-lg bg-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
                    />
                    <Button onClick={submit} disabled={isLoading || !text.trim()} className="mt-3">
                        Опубликовать
                    </Button>
                </div>
            )}

            {reviews.length === 0 && <p className="text-sm text-gray-500">Пока нет отзывов.</p>}

            {friendReviews.length > 0 && (
                <>
                    <div className="mb-2 text-xs text-brand">Друзья</div>
                    <div className="flex flex-col gap-3">
                        {friendReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                    </div>
                </>
            )}

            {otherReviews.length > 0 && (
                <>
                    {friendReviews.length > 0 && <div className="mt-4 mb-2 text-xs text-gray-500">Остальные</div>}
                    <div className="flex flex-col gap-3">
                        {otherReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                    </div>
                </>
            )}
        </section>
    );
}

export default Reviews;